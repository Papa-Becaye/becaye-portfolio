"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { navigation, sectionIds, hrefForItem } from "@/data/navigation";
import useActiveSection from "@/hooks/useActiveSection";
import useScrollDirection from "@/hooks/useScrollDirection";
import { siteConfig } from "@/data/site";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import CvButton from "@/components/ui/CvButton";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const pathname = usePathname() || "";
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const { scrolled, hidden } = useScrollDirection();
  const sectionActive = useActiveSection(sectionIds, isHome);
  const [open, setOpen] = useState(false);

  // Ferme le menu quand la route change, sans setState synchronique dans un effet.
  const navKey = `${pathname}|${lang}`;
  const [previousNavKey, setPreviousNavKey] = useState(navKey);
  if (previousNavKey !== navKey) {
    setPreviousNavKey(navKey);
    setOpen(false);
  }

  const pageActive = pathname.startsWith(`/${lang}/realisations`)
    ? "realisations"
    : pathname.startsWith(`/${lang}/blog`)
      ? "blog"
      : pathname.includes("/projects/")
        ? "projects"
        : null;
  const active = isHome ? sectionActive : pageActive;

  // Verrouille le scroll et gère Escape quand le menu mobile est ouvert
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || open ? "border-b border-line/80 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link
            href={`/${lang}`}
            aria-label={t("a11y.home")}
            className="ltr-iso font-display text-[1.35rem] font-bold tracking-[0.04em] text-fg"
          >
            {siteConfig.shortName}
            <span className="text-accent">.</span>
          </Link>

          <nav aria-label={t("a11y.mainNav")} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={hrefForItem(item, lang)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block px-2.5 py-2 text-sm transition-colors duration-200 xl:px-3.5 ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {t(item.labelKey)}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          className="absolute inset-x-2.5 -bottom-0.5 h-px bg-accent xl:inset-x-3.5"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden xl:block"><AvailabilityBadge short /></div>
            <LanguageSwitcher />
            <div className="hidden lg:block"><CvButton short /></div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t(open ? "a11y.closeMenu" : "a11y.openMenu")}
              className="relative -me-2 flex size-10 items-center justify-center lg:hidden"
            >
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg px-5 pb-8 pt-24 lg:hidden"
          >
            <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
            <nav aria-label={t("a11y.mainNav")} className="relative">
              <ul className="divide-y divide-line border-y border-line">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={hrefForItem(item, lang)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-4 font-display text-[clamp(1.9rem,8vw,2.75rem)] font-semibold leading-tight transition-colors hover:text-accent"
                    >
                      <span className="label ltr-iso w-7 text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className={active === item.id ? "text-accent" : ""}>{t(item.labelKey)}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="relative mt-auto flex flex-col gap-5 pt-10">
              <AvailabilityBadge />
              <CvButton variant="primary" size="md" className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
