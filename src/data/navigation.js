// `id` correspond à l'ancre de la section sur la page d'accueil.
// `labelKey` pointe vers src/locales/*/translation.json
export const navigation = [
  { id: "home", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "expertise", labelKey: "nav.expertise" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "contact", labelKey: "nav.contact" },
];

export const sectionIds = navigation.map((item) => item.id);
