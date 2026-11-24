/**
 * Projets — pour ajouter un projet :
 *  1. Ajoutez une entrée ci-dessous (slug unique).
 *  2. Ajoutez ses textes dans src/locales/{fr,en,ar}/translation.json
 *     sous `projects.items.<key>` (name, category, summary, intro, details…).
 *  3. (Optionnel) déposez une vraie capture dans /public/images/projects/
 *     et renseignez `image`. Sans image, une composition graphique abstraite
 *     (et non une fausse capture d'écran) est affichée.
 */
export const projects = [
  {
    slug: "tabaxbi",
    key: "tabaxbi",
    index: "01",
    featured: true,
    type: "project",
    // Catégories affichées dans les filtres de /realisations
    filters: ["saas", "web", "backend"],
    url: "https://tabaxbi.com",
    image: null, // ex: "/images/projects/tabaxbi.jpg"
    imageAlt: "",
    stack: [
      "React",
      "Vite",
      "JavaScript",
      "Redux",
      "Node.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Traefik",
    ],
  },
  {
    slug: "quadra-ao",
    key: "quadraAo",
    index: "02",
    featured: false,
    type: "experience",
    filters: ["saas", "experience"],
    url: null,
    image: null,
    imageAlt: "",
    stack: ["Vue.js", ".NET"],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
