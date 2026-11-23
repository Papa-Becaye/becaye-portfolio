"use client";

import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { getCvUrl } from "@/data/site";

/**
 * Bouton CV. Si aucun PDF n'est configuré pour la langue, le bouton renvoie
 * vers la section Contact (« Demander mon CV ») plutôt que vers un lien cassé.
 */
export default function CvButton({ short = false, variant = "secondary", size = "sm", className = "" }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const url = getCvUrl(lang);

  if (url) {
    return (
      <Button href={url} download variant={variant} size={size} icon={null} className={className}>
        <Download aria-hidden="true" className="size-3.5" />
        {t(short ? "nav.cvShort" : "nav.cv")}
      </Button>
    );
  }
  return (
    <Button href={`/${lang}#contact`} variant={variant} size={size} icon={null} className={className}>
      <Download aria-hidden="true" className="size-3.5" />
      {t(short ? "nav.cvRequestShort" : "nav.cvRequest")}
    </Button>
  );
}
