/**
 * Parcours — timeline.
 * - `key`  : traduction → experience.items.<key>.{role,org,period,summary}
 * - `type` : internship | job | project | education | collaboration
 * - `dates`: { start, end } au format libre (ex: "2024", "2024 — 2025") ou null.
 *            Aucune date n'est inventée : si `dates` est null, c'est la
 *            valeur traduite `period` (ex: « Stage de six mois ») qui s'affiche.
 * - `projectSlug` : lien optionnel vers une page projet.
 * - `stack` : technologies associées.
 * Les entrées sont affichées dans l'ordre du tableau.
 */
export const experiences = [
  {
    key: "quadraAo",
    type: "internship",
    dates: null,
    projectSlug: "quadra-ao",
    stack: ["Vue.js", ".NET"],
  },
  {
    key: "tabaxbi",
    type: "project",
    dates: null,
    projectSlug: "tabaxbi",
    stack: ["React", "Node.js", "Prisma", "PostgreSQL", "Docker"],
  },
];
