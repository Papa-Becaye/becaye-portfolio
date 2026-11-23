import { siteConfig, getWhatsappUrl } from "@/data/site";

const pretty = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Canaux de contact réellement configurés (les valeurs vides sont ignorées). */
export function getChannels() {
  const list = [];
  if (siteConfig.email) {
    list.push({ id: "email", href: `mailto:${siteConfig.email}`, display: siteConfig.email, external: false });
  }
  if (siteConfig.linkedin) {
    list.push({ id: "linkedin", href: siteConfig.linkedin, display: pretty(siteConfig.linkedin), external: true });
  }
  if (siteConfig.github) {
    list.push({ id: "github", href: siteConfig.github, display: pretty(siteConfig.github), external: true });
  }
  const wa = getWhatsappUrl();
  if (wa) {
    list.push({ id: "whatsapp", href: wa, display: `+${siteConfig.whatsapp.replace(/\D/g, "")}`, external: true });
  }
  if (siteConfig.phone) {
    list.push({ id: "phone", href: `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`, display: siteConfig.phone, external: false });
  }
  return list;
}
