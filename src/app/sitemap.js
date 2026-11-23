import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { languageCodes, defaultLanguage } from "@/i18n/languages";

export default function sitemap() {
  const lastModified = new Date();
  const entry = (path, priority) => ({
    url: `${siteConfig.siteUrl}/${defaultLanguage}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: Object.fromEntries(languageCodes.map((c) => [c, `${siteConfig.siteUrl}/${c}${path}`])),
    },
  });
  const entries = [];
  const paths = [["", 1], ...projects.map((p) => [`/projects/${p.slug}`, 0.8])];
  languageCodes.forEach((code) => {
    paths.forEach(([path, priority]) => {
      entries.push({ ...entry(path, priority), url: `${siteConfig.siteUrl}/${code}${path}` });
    });
  });
  return entries;
}
