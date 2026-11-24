import { notFound } from "next/navigation";
import RealisationsPage from "@/screens/Realisations/RealisationsPage";
import { getI18n } from "@/i18n";
import { languages, isValidLanguage } from "@/i18n/languages";
import { languageAlternates } from "@/utils/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLanguage(lang)) return {};
  const t = getI18n(lang).t;
  const title = t("meta.workTitle");
  const description = t("realisations.intro");
  const path = "/realisations";

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
  return <RealisationsPage />;
}
