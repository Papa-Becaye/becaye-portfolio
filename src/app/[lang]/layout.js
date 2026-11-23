import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "@/styles/globals.css";

import { notFound } from "next/navigation";
import Providers from "@/components/common/Providers";
import SkipLink from "@/components/common/SkipLink";
import ScrollProgress from "@/components/common/ScrollProgress";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/navigation/Navbar";
import { siteConfig } from "@/data/site";
import { getI18n } from "@/i18n";
import { languageCodes, languages, isValidLanguage } from "@/i18n/languages";
import { languageAlternates } from "@/utils/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isValidLanguage(lang)) return {};
  const t = getI18n(lang).t;
  const title = t("meta.title");
  const description = t("meta.description");

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    keywords: [
      "Bécaye FALL",
      "Full Stack Developer",
      "Tech Entrepreneur",
      "Dakar",
      "Sénégal",
      "React",
      "Node.js",
      "PostgreSQL",
    ],
    alternates: { canonical: `/${lang}`, languages: languageAlternates() },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: `/${lang}`,
      locale: languages[lang].locale,
      alternateLocale: languageCodes.filter((c) => c !== lang).map((c) => languages[c].locale),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: "#0B0B0F",
  colorScheme: "dark",
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isValidLanguage(lang)) notFound();

  const t = getI18n(lang).t;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description: t("meta.description"),
    url: `${siteConfig.siteUrl}/${lang}`,
    address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
    sameAs: [siteConfig.linkedin, siteConfig.github].filter(Boolean),
  };

  return (
    <html lang={lang} dir={languages[lang].dir} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/clash-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Providers lang={lang}>
          <SkipLink />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
