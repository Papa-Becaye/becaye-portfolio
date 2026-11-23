// Configuration centralisée des langues.
export const languages = {
  fr: { code: "fr", dir: "ltr", name: "Français", short: "FR", locale: "fr_FR", font: "Clash Display / Inter" },
  en: { code: "en", dir: "ltr", name: "English", short: "EN", locale: "en_US", font: "Clash Display / Inter" },
  ar: { code: "ar", dir: "rtl", name: "العربية", short: "AR", locale: "ar_SN", font: "IBM Plex Sans Arabic" },
};

export const defaultLanguage = "fr";
export const languageCodes = Object.keys(languages);
export const STORAGE_KEY = "bf-lang";

export const isValidLanguage = (code) => Object.prototype.hasOwnProperty.call(languages, code);
export const getDirection = (code) => (languages[code] ? languages[code].dir : "ltr");
