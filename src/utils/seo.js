import { languageCodes, defaultLanguage } from "@/i18n/languages";

/** Alternates hreflang pour un chemin (ex: "" ou "/projects/tabaxbi"). */
export function languageAlternates(path = "") {
  const languages = {};
  languageCodes.forEach((code) => {
    languages[code] = `/${code}${path}`;
  });
  languages["x-default"] = `/${defaultLanguage}${path}`;
  return languages;
}
