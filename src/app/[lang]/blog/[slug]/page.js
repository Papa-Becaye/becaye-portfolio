import { notFound } from "next/navigation";
import ArticlePage from "@/screens/Blog/ArticlePage";
import { getAllPosts, getAllSlugs, getPost } from "@/lib/blog";
import { siteConfig } from "@/data/site";
import { getI18n } from "@/i18n";
import { languageCodes, languages, isValidLanguage } from "@/i18n/languages";
import { languageAlternates } from "@/utils/seo";
import renderMarkdown from "@/lib/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return languageCodes.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const post = getPost(slug, lang);
  if (!post || !isValidLanguage(lang)) return {};
  const t = getI18n(lang).t;
  const title = t("meta.articleTitle", { title: post.title });
  const description = post.excerpt;
  const path = `/blog/${slug}`;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: { canonical: `/${lang}${path}`, languages: languageAlternates(path) },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/${lang}${path}`,
      locale: languages[lang].locale,
      publishedTime: post.date,
      tags: post.tags,
      images: post.cover ? [{ url: post.cover, alt: t("blog.coverAlt") }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: post.cover ? [post.cover] : undefined },
  };
}

export default async function Page({ params }) {
  const { lang, slug } = await params;
  if (!isValidLanguage(lang)) notFound();
  const post = getPost(slug, lang);
  if (!post) notFound();

  const posts = getAllPosts(lang);
  const index = posts.findIndex((item) => item.slug === slug);
  const following = posts.length > 1 ? posts[(index + 1) % posts.length] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: lang,
    author: { "@type": "Person", name: siteConfig.name, url: `${siteConfig.siteUrl}/${lang}` },
    publisher: { "@type": "Person", name: siteConfig.name },
    image: post.cover ? `${siteConfig.siteUrl}${post.cover}` : undefined,
    mainEntityOfPage: `${siteConfig.siteUrl}/${lang}/blog/${slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticlePage
        post={{ slug: post.slug, title: post.title, excerpt: post.excerpt, category: post.category, date: post.date, readTime: post.readTime, cover: post.cover, tags: post.tags }}
        next={following ? { slug: following.slug, title: following.title, category: following.category } : null}
        content={renderMarkdown(post.body)}
      />
    </>
  );
}
