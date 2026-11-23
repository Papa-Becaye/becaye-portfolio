"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import { siteConfig } from "@/data/site";
import HeroVisual from "./HeroVisual";

const EASE = [0.22, 1, 0.36, 1];

function LocalTime({ lang }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () => {
      try {
        setTime(
          new Intl.DateTimeFormat(`${lang}-u-nu-latn`, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: siteConfig.timeZone,
          }).format(new Date()),
        );
      } catch {
        setTime("");
      }
    };
    format();
    const id = setInterval(format, 30000);
    return () => clearInterval(id);
  }, [lang]);
  return <span className="ltr-iso tabular-nums">{time || "--:--"}</span>;
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const title = t("hero.title", { returnObjects: true });
  const lines = Array.isArray(title) ? title : [String(title)];
  const accentIndex = 1;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-28 md:pt-32">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="wrap relative grid flex-1 items-center gap-16 py-8 lg:grid-cols-12 lg:gap-8 lg:py-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="label mb-8 flex items-center gap-3 text-fg/80 md:mb-10"
          >
            <span aria-hidden="true" className="size-2 bg-accent" />
            {t("hero.label")}
          </motion.p>

          <h1 id="hero-title" className="hero-title font-display text-fg">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className={`block ${i === accentIndex ? "text-accent" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-8 max-w-xl text-[1.0625rem] text-muted text-pretty md:mt-10 md:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap md:mt-11"
          >
            <Button href={`/${lang}#projects`}>{t("hero.ctaProjects")}</Button>
            <Button href={`/${lang}#contact`} variant="secondary" icon="up-right">
              {t("hero.ctaContact")}
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-3 md:mt-16"
          >
            <div>
              <dt className="label mb-1.5">{t("hero.name")}</dt>
              <dd className="font-display text-[1.05rem] font-semibold ltr-iso">{siteConfig.name}</dd>
            </div>
            <div>
              <dt className="label mb-1.5">{t("hero.location")}</dt>
              <dd className="text-[0.95rem]">
                {t("about.facts.0.value")}
                <span className="ms-2 text-muted">
                  · <LocalTime lang={lang} />
                </span>
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="label mb-2">{t("hero.status")}</dt>
              <dd>
                <AvailabilityBadge />
              </dd>
            </div>
          </motion.dl>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      <div className="wrap relative mt-4 hidden items-center justify-between md:flex">
        <a href={`/${lang}#about`} className="group flex items-center gap-3 label transition-colors hover:text-fg">
          <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-accent"
              animate={{ y: [-12, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          {t("hero.scroll")}
        </a>
        <span className="label ltr-iso">{siteConfig.coordinates}</span>
      </div>
    </section>
  );
}
