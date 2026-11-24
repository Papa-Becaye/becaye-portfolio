import { Fragment } from "react";

/** Rendu d'un sous-ensemble de Markdown en éléments Réact (pas de HTML injecté). */
function renderInline(text) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((token, i) => {
    if (!token) return null;
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={i} className="font-semibold text-fg">{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return <code key={i} className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent">{token.slice(1, -1)}</code>;
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={i} className="italic">{token.slice(1, -1)}</em>;
    }
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={i}
          href={link[2]}
          className="link-underline text-accent"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{token}</Fragment>;
  });
}

const isBlockStart = (line) =>
  /^#{2,3}\s/.test(line) ||
  /^>\s?/.test(line) ||
  /^[-*]\s/.test(line) ||
  /^\d+\.\s/.test(line) ||
  /^```/.test(line) ||
  /^---\s*$/.test(line);

export default function renderMarkdown(markdown) {
  const lines = (markdown || "").split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      i += 1;
      const code = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push(
        <pre key={blocks.length} data-language={language || undefined}>
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const Tag = heading[1].length === 2 ? "h2" : "h3";
      blocks.push(<Tag key={blocks.length}>{renderInline(heading[2])}</Tag>);
      i += 1;
      continue;
    }

    if (/^---\s*$/.test(line)) {
      blocks.push(<hr key={blocks.length} />);
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoted = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoted.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(<blockquote key={blocks.length}><p>{renderInline(quoted.join(" "))}</p></blockquote>);
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s/, ""));
        i += 1;
      }
      blocks.push(<ul key={blocks.length}>{items.map((item, n) => <li key={n}>{renderInline(item)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i += 1;
      }
      blocks.push(<ol key={blocks.length}>{items.map((item, n) => <li key={n}>{renderInline(item)}</li>)}</ol>);
      continue;
    }

    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push(<p key={blocks.length}>{renderInline(paragraph.join(" "))}</p>);
  }

  return blocks;
}
