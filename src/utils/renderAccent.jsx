import { Fragment } from "react";

/**
 * Met en valeur les mots entourés d'astérisques dans une traduction :
 * "Beyond the *code*." → Beyond the <span class="text-accent">code</span>.
 */
export default function renderAccent(text) {
  if (typeof text !== "string") return text;
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className="text-accent">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
