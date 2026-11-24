"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navigation, hrefForItem } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { getChannels } from "@/utils/channels";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const channels = getChannels();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2">
      <div className="wrap pb-6 pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[1.6rem] font-semibold leading-tight md:text-3xl">
              {t("footer.tagline")}
            </p>
            <p className="label mt-5 ltr-iso">
              {siteConfig.name} · {siteConfig.location}
            </p>
          </div>

          <nav aria-label={t("footer.navigate")} className="md:col-span-3">
            <h2 className="label mb-5">{t("footer.navigate")}</h2>
            <ul className="space-y-3 text-[15px]">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link href={hrefForItem(item, lang)} className="link-underline text-fg/90 hover:text-accent">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {channels.length > 0 && (
            <div className="md:col-span-3">
              <h2 className="label mb-5">{t("footer.connect")}</h2>
              <ul className="space-y-3 text-[15px]">
                {channels.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="link-underline text-fg/90 hover:text-accent"
                    >
                      {t(`contact.${c.id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          aria-hidden="true"
          dir="ltr"
          className="outline-text-strong select-none whitespace-nowrap pt-16 text-center font-display text-[clamp(3.2rem,15.5vw,15rem)] font-bold leading-[0.85] md:pt-24"
        >
          BÉCAYE FALL
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted md:flex-row md:items-center">
          <p>
            <span className="ltr-iso">© {year} {siteConfig.name}.</span> {t("footer.rights")}
          </p>
          <p>{t("footer.built")}</p>
          <a
            href={`/${lang}#home`}
            className="group inline-flex items-center gap-2 text-fg/80 transition-colors hover:text-accent"
            aria-label={t("a11y.backToTop")}
          >
            {t("footer.backToTop")}
            <ArrowUp aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
