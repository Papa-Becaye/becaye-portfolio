const LOCALES = { fr: "fr-FR", en: "en-US", ar: "ar" };

export function formatPostDate(date, lang) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(LOCALES[lang] || LOCALES.fr, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}
