import { notFound } from "next/navigation";
import ProjectDetailsPage from "@/screens/ProjectDetails/ProjectDetailsPage";
import { getProject, projects } from "@/data/projects";
import { getI18n } from "@/i18n";
import { languageCodes, isValidLanguage, languages } from "@/i18n/languages";
import { languageAlternates } from "@/utils/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return languageCodes.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project || !isValidLanguage(lang)) return {};
  const t = getI18n(lang).t;
  const base = `projects.items.${project.key}`;
  const title = t("meta.projectTitle", { name: t(`${base}.name`) });
  const description = t(`${base}.summary`);
  const path = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/${lang}${path}`, languages: languageAlternates(path) },
    openGraph: { type: "article", title, description, url: `/${lang}${path}`, locale: languages[lang].locale },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <ProjectDetailsPage slug={slug} />;
}
