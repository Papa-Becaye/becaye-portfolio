import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { getAllSlugs, getPost } from "@/lib/blog";
import { languageCodes, defaultLanguage } from "@/i18n/languages";

export default function sitemap() {
  const lastModified = new Date();
  const entry = (path, priority, modified = lastModified, images) => ({
    url: `${siteConfig.siteUrl}/${defaultLanguage}${path}`,
    lastModified: modified,
    changeFrequency: "monthly",
    priority,
    ...(images ? { images } : {}),
    alternates: {
      languages: Object.fromEntries(languageCodes.map((c) => [c, `${siteConfig.siteUrl}/${c}${path}`])),
    },
  });

  const entries = [];
  const paths = [
    ["", 1],
    ["/realisations", 0.9],
    ["/blog", 0.9],
    ...projects.map((p) => [`/projects/${p.slug}`, 0.8]),
    ...getAllSlugs().map((slug) => {
      const post = getPost(slug, defaultLanguage);
      return [`/blog/${slug}`, 0.7, post?.date || lastModified, post?.cover ? [`${siteConfig.siteUrl}${post.cover}`] : undefined];
    }),
  ];

  languageCodes.forEach((code) => {
    paths.forEach(([path, priority, modified, images]) => {
      entries.push({ ...entry(path, priority, modified, images), url: `${siteConfig.siteUrl}/${code}${path}` });
    });
  });
  return entries;
}
