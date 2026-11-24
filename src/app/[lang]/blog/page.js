import { notFound } from "next/navigation";
import BlogPage from "@/screens/Blog/BlogPage";
import { getAllPosts } from "@/lib/blog";
import { getI18n } from "@/i18n";
import { languages, isValidLanguage } from "@/i18n/languages";
import { languageAlternates } from "@/utils/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLanguage(lang)) return {};
  const t = getI18n(lang).t;
  const title = t("meta.blogTitle");
  const description = t("blog.intro");
  const path = "/blog";

  return {
    title,
    description,
    alternates: { canonical: `/${lang}${path}`, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${lang}${path}`,
      locale: languages[lang].locale,
      alternateLocale: Object.keys(languages).filter((code) => code !== lang).map((code) => languages[code].locale),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  if (!isValidLanguage(lang)) notFound();
  const posts = getAllPosts(lang).map(({ body, ...post }) => post);
  return <BlogPage posts={posts} />;
}
