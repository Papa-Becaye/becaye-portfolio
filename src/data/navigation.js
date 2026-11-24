// `id` correspond à l'ancre de la section sur la page d'accueil pour les
// entrées sans `href`. Les entrées avec `href` pointent vers une vraie page.
// `labelKey` pointe vers src/locales/{fr,en,ar}/translation.json
export const navigation = [
  { id: "home", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "expertise", labelKey: "nav.expertise" },
  { id: "realisations", labelKey: "nav.work", href: "/realisations" },
  { id: "blog", labelKey: "nav.blog", href: "/blog" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "contact", labelKey: "nav.contact" },
];

// Seules les ancres existent sur la page d'accueil.
export const sectionIds = navigation.filter((item) => !item.href).map((item) => item.id);

export function hrefForItem(item, lang) {
  return item.href ? `/${lang}${item.href}` : `/${lang}#${item.id}`;
}
