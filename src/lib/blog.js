import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

/**
 * Très petit « CMS » de fichiers : un article = 3 fichiers Markdown
 * (content/blog/<slug>.fr.md, .en.md, .ar.md) avec un frontmatter simple.
 * Lu uniquement au build, donc compatible avec les pages statiques et OpenNext.
 */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw.trim() };

  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((item) => item.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    }
    data[key] = value;
  });

  return { data, body: raw.slice(match[0].length).trim() };
}

export const getAllPosts = cache((lang = "fr") => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const suffix = `.${lang}.md`;
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(suffix))
    .map((file) => {
      const slug = file.slice(0, -suffix.length);
      const { data, body } = parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        category: data.category || "learnings",
        date: data.date || "",
        readTime: String(data.readTime || "5"),
        cover: data.cover || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: data.featured === true || data.featured === "true",
        body,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
});

export const getPost = cache((slug, lang) => getAllPosts(lang).find((post) => post.slug === slug) || null);

export function getAllSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return [...new Set(fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.[a-z]{2}\.md$/, "")))];
}
