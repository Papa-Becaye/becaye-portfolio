/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURATION PERSONNELLE — le seul fichier à éditer pour
 *  mettre à jour vos informations (nom, contacts, CV, photo…).
 *
 *  Les valeurs vides ("") sont automatiquement masquées sur le
 *  site : aucun lien factice n'est jamais affiché.
 *  Chaque valeur peut aussi être fournie par variable d'environnement
 *  (NEXT_PUBLIC_*) — voir .env.example.
 * ─────────────────────────────────────────────────────────────
 */
// ⚠ Les variables NEXT_PUBLIC_* doivent être référencées littéralement
// (process.env.NEXT_PUBLIC_X) pour être injectées dans le bundle client.

export const siteConfig = {
  name: "Bécaye FALL",
  shortName: "BÉCAYE",
  title: "Full Stack Developer & Tech Entrepreneur",
  location: "Dakar, Sénégal",
  // Fuseau horaire utilisé pour l'horloge locale du Hero
  timeZone: "Africa/Dakar",
  coordinates: "14.69°N · 17.44°W",

  // URL publique du site (SEO, sitemap, Open Graph, hreflang)
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  // ── Contacts (laisser vide pour masquer) ──────────────────
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "", // ex: "+221 77 000 00 00"
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "", // numéro international, ex: "221770000000"
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "", // ex: "https://www.linkedin.com/in/…"
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "", // ex: "https://github.com/…"

  // ── CV ────────────────────────────────────────────────────
  // Déposez vos PDF dans /public/cv puis renseignez le chemin.
  // Si une langue est vide, le bouton propose « Demander mon CV »
  // (renvoi vers la section Contact) au lieu d'un lien cassé.
  cv: {
    fr: process.env.NEXT_PUBLIC_CV_FR || "", // ex: "/cv/becaye-fall-cv-fr.pdf"
    en: process.env.NEXT_PUBLIC_CV_EN || "",
    ar: process.env.NEXT_PUBLIC_CV_AR || "",
  },

  // ── Photo ─────────────────────────────────────────────────
  // Déposez l'image dans /public/images (ex: "/images/becaye.jpg").
  // Vide = monogramme typographique.
  photo: process.env.NEXT_PUBLIC_PHOTO || "",

  // ── Disponibilité : "available" | "limited" | "unavailable" ──
  availability: process.env.NEXT_PUBLIC_AVAILABILITY || "available",
};

export function getCvUrl(lang) {
  return siteConfig.cv[lang] || siteConfig.cv.fr || siteConfig.cv.en || "";
}

export function getWhatsappUrl() {
  const digits = (siteConfig.whatsapp || "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}
