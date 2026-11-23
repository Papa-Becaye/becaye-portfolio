/**
 * Domaines d'expertise.
 * - `id`  : clé de traduction → expertise.domains.<id>.{title,description}
 * - `items` : { label } (nom propre, non traduit) ou { i18n } (clé expertise.items.<i18n>)
 * - `featured` : domaines mis en avant dans la hiérarchie visuelle
 * Aucun pourcentage de maîtrise : volontairement.
 */
export const skillDomains = [
  {
    id: "frontend",
    featured: true,
    items: [
      { label: "React.js" },
      { label: "Vue.js" },
      { label: "JavaScript" },
      { label: "HTML5" },
      { label: "CSS3" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    featured: true,
    items: [
      { label: "Node.js" },
      { label: "Express.js" },
      { label: "NestJS" },
      { label: "Prisma" },
      { label: "API REST" },
    ],
  },
  {
    id: "database",
    featured: false,
    items: [{ label: "PostgreSQL" }, { label: "MySQL" }],
  },
  {
    id: "mobile",
    featured: false,
    items: [{ label: "Flutter" }, { label: "React Native" }, { label: "Expo" }],
  },
  {
    id: "devops",
    featured: false,
    items: [
      { label: "Docker" },
      { label: "Git" },
      { label: "GitHub" },
      { label: "Linux" },
      { label: "Traefik" },
      { label: "VPS" },
      { label: "CI/CD" },
    ],
  },
  {
    id: "innovation",
    exploration: true,
    items: [
      { label: "Python" },
      { i18n: "ai" },
      { label: "OpenAI API" },
      { i18n: "aiAgents" },
      { i18n: "automation" },
    ],
  },
];
