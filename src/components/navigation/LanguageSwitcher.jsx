"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { STORAGE_KEY, languageCodes, languages } from "@/i18n/languages";

/**
 * Sélecteur FR / EN / AR.
 * Chaque option est un vrai lien localisé (/fr, /en, /ar) pour le SEO et
 * l'accessibilité ; le clic déclenche une navigation client instantanée
 * (pas de rechargement) qui conserve la section courante.
 */
export default function LanguageSwitcher({ className = "", onSwitch }) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const current = i18n.language;

  const hrefFor = (code) => {
    const parts = pathname.split("/");
    parts[1] = code;
    return parts.join("/") || `/${code}`;
  };

  const handleClick = (event, code) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (code === current) return;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    router.push(`${hrefFor(code)}${window.location.hash}`, { scroll: false });
    if (onSwitch) onSwitch(code);
  };

  return (
    <div
      role="group"
      aria-label={t("a11y.language")}
      dir="ltr"
      className={`inline-flex items-center rounded-full border border-line bg-bg/60 p-0.5 ${className}`}
    >
      {languageCodes.map((code) => {
        const active = code === current;
        return (
          <Link
            key={code}
            href={hrefFor(code)}
            hrefLang={code}
            lang={code}
            prefetch
            scroll={false}
            aria-current={active ? "true" : undefined}
            aria-label={languages[code].name}
            title={languages[code].name}
            onClick={(e) => handleClick(e, code)}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] leading-none transition-colors duration-200 ${
              active ? "bg-accent text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {languages[code].short}
          </Link>
        );
      })}
    </div>
  );
}
