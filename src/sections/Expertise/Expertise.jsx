"use client";

import { useTranslation } from "react-i18next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillDomains } from "@/data/skills";

function Items({ domain, t }) {
  const size = domain.featured
    ? "font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-semibold leading-tight text-fg"
    : domain.exploration
      ? "font-mono text-[0.95rem] text-fg/85"
      : "font-display text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium leading-tight text-fg/85";

  return (
    <ul className="flex flex-wrap items-baseline gap-x-0 gap-y-2.5">
      {domain.items.map((item, i) => {
        const text = item.i18n ? t(`expertise.items.${item.i18n}`) : item.label;
        return (
          <li
            key={text}
            className={`${size} flex items-baseline after:mx-3 after:text-line after:content-['/'] last:after:hidden md:after:mx-4`}
          >
            <span className={`${item.label ? "ltr-iso" : ""} cursor-default transition-colors duration-200 hover:text-accent`}>
              {text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Expertise() {
  const { t } = useTranslation();

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section-pad relative border-y border-line bg-bg-2">
      <div className="wrap">
        <SectionHeading titleId="expertise-title"
            index="02"
            eyebrow={t("expertise.eyebrow")}
            title={t("expertise.title")}
            intro={t("expertise.intro")}
          />

        <ul className="border-t border-line">
          {skillDomains.map((domain, i) => (
            <Reveal
              as="li"
              key={domain.id}
              delay={0.04}
              className={`group relative grid gap-5 border-b border-line py-8 transition-colors duration-300 hover:bg-surface/50 md:grid-cols-12 md:gap-8 md:px-4 md:py-11 ${
                domain.exploration ? "border-dashed" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 start-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100"
              />
              <span className="label ltr-iso transition-colors group-hover:text-accent md:col-span-1 md:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-4">
                <h3 className={`${domain.featured ? "display-md" : "font-display text-xl font-semibold"} flex flex-wrap items-center gap-3`}>
                  {t(`expertise.domains.${domain.id}.title`)}
                  {domain.exploration && (
                    <span className="label rounded-full border border-accent/50 px-2.5 py-0.5 text-accent">
                      {t("expertise.exploration")}
                    </span>
                  )}
                </h3>
                <p className="mt-3 max-w-sm text-[0.95rem] text-muted">
                  {t(`expertise.domains.${domain.id}.description`)}
                </p>
              </div>
              <div className="md:col-span-7 md:pt-1">
                <Items domain={domain} t={t} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
