"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TechTag from "@/components/ui/TechTag";
import { experiences } from "@/data/experiences";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading
          titleId="experience-title"
          index="04"
          eyebrow={t("experience.eyebrow")}
          title={t("experience.title")}
          intro={t("experience.intro")}
        />

        <ol className="relative border-s border-line lg:ms-auto lg:w-8/12">
          {experiences.map((exp, i) => {
            const base = `experience.items.${exp.key}`;
            const period = exp.dates ? [exp.dates.start, exp.dates.end].filter(Boolean).join(" — ") : t(`${base}.period`);
            return (
              <Reveal as="li" key={exp.key} className="group relative ps-8 pb-16 md:ps-14">
                <span
                  aria-hidden="true"
                  className={`absolute -start-[5px] top-2 size-[9px] rounded-full border transition-colors duration-300 ${
                    i === 0 ? "border-accent bg-accent" : "border-muted bg-bg group-hover:border-accent group-hover:bg-accent"
                  }`}
                />
                <p className="label mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-accent">{t(`experience.types.${exp.type}`)}</span>
                  {period && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className={exp.dates ? "ltr-iso" : ""}>{period}</span>
                    </>
                  )}
                </p>
                <h3 className="display-md">{t(`${base}.role`)}</h3>
                <p className="mt-2 font-display text-xl font-medium text-muted ltr-iso">{t(`${base}.org`)}</p>
                <p className="mt-5 max-w-xl text-muted text-pretty">{t(`${base}.summary`)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.stack.map((s) => (
                    <TechTag key={s}>{s}</TechTag>
                  ))}
                </div>
                {exp.projectSlug && (
                  <Link
                    href={`/${lang}/projects/${exp.projectSlug}`}
                    className="group/link mt-6 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
                  >
                    <span className="link-underline">{t("experience.viewMore")}</span>
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/link:translate-x-1 rtl:-scale-x-100 rtl:group-hover/link:-translate-x-1" />
                  </Link>
                )}
              </Reveal>
            );
          })}

          {/* entrée à venir — extensible via src/data/experiences.js */}
          <Reveal as="li" className="relative ps-8 md:ps-14">
            <span aria-hidden="true" className="absolute -start-[5px] top-2 size-[9px] rounded-full border border-dashed border-muted bg-bg" />
            <p className="label mb-3 ltr-iso">{"// "}{t("experience.next")}</p>
            <p className="max-w-md text-muted">{t("experience.nextText")}</p>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
