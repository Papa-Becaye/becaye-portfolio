"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { I18nextProvider } from "react-i18next";
import { MotionConfig } from "framer-motion";
import { getI18n } from "@/i18n";
import {
  STORAGE_KEY,
  defaultLanguage,
  getDirection,
  isValidLanguage,
} from "@/i18n/languages";

const SESSION_KEY = "bf-lang-checked";

/**
 * Fournit i18next (une instance par langue), respecte prefers-reduced-motion
 * et synchronise <html lang/dir> + localStorage avec la langue de l'URL.
 */
export default function Providers({ lang, children }) {
  const router = useRouter();
  const i18n = useMemo(() => getI18n(lang), [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = getDirection(lang);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const alreadyChecked = sessionStorage.getItem(SESSION_KEY);
      sessionStorage.setItem(SESSION_KEY, "1");

      // Première arrivée de la session sur la langue par défaut :
      // on restaure la langue mémorisée par le visiteur.
      if (
        !alreadyChecked &&
        lang === defaultLanguage &&
        stored &&
        stored !== lang &&
        isValidLanguage(stored)
      ) {
        router.replace(`/${stored}${window.location.hash}`, { scroll: false });
        return;
      }
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* stockage indisponible (mode privé) : sans incidence */
    }
  }, [lang, router]);

  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </I18nextProvider>
  );
}
