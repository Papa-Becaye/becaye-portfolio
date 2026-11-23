"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

function Corner({ className }) {
  return <span aria-hidden="true" className={`absolute size-4 border-accent ${className}`} />;
}

function Portrait() {
  const { t } = useTranslation();
  return (
    <div className="relative">
      {/* cadre décalé en arrière-plan */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border border-line rtl:-translate-x-3" />
      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
        {siteConfig.photo ? (
          <Image
            src={siteConfig.photo}
            alt={t("about.photoAlt")}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover grayscale transition duration-700 hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70" />
            <span
              aria-hidden="true"
              dir="ltr"
              className="outline-text-strong relative font-display text-[clamp(7rem,22vw,15rem)] font-bold leading-none"
            >
              BF
              <span className="text-accent" style={{ WebkitTextStroke: 0 }}>.</span>
            </span>
          </div>
        )}
        <Corner className="start-3 top-3 border-s border-t" />
        <Corner className="end-3 top-3 border-e border-t" />
        <Corner className="bottom-3 start-3 border-b border-s" />
        <Corner className="bottom-3 end-3 border-b border-e" />
      </div>
      <p className="label mt-6 flex items-center justify-between">
        <span>{t("about.photoCaption")}</span>
        <span className="ltr-iso">{siteConfig.coordinates}</span>
      </p>
    </div>
  );
}

export default function About() {
  const { t } = useTranslation();
  const paragraphs = t("about.paragraphs", { returnObjects: true });
  const principles = t("about.principles", { returnObjects: true });
  const facts = t("about.facts", { returnObjects: true });
  const traits = t("about.traits", { returnObjects: true });

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading titleId="about-title" index="01" eyebrow={t("about.eyebrow")} title={t("about.title")} />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Portrait />
              <dl className="mt-10 border-t border-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                    <dt className="label shrink-0">{fact.label}</dt>
                    <dd className="text-end text-[0.95rem]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal as="p" className="font-display text-[clamp(1.35rem,2.4vw,1.95rem)] font-medium leading-[1.3] text-fg text-pretty">
              {paragraphs[0]}
            </Reveal>
            {paragraphs.slice(1).map((p, i) => (
              <Reveal as="p" key={i} delay={0.05 * (i + 1)} className="mt-6 max-w-2xl text-lg text-muted text-pretty">
                {p}
              </Reveal>
            ))}

            <Reveal className="mt-8 flex flex-wrap gap-2.5">
              {traits.map((trait) => (
                <span key={trait} className="rounded-full border border-line px-4 py-1.5 text-[13px] text-fg/85">
                  {trait}
                </span>
              ))}
            </Reveal>

            <div className="mt-16 md:mt-20">
              <Reveal as="h3" className="label mb-6 text-accent">
                {t("about.principlesTitle")}
              </Reveal>
              <ol className="border-t border-line">
                {principles.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={i * 0.06} className="group grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-line py-6 md:grid-cols-[4rem_1fr_1fr] md:items-baseline md:py-7">
                    <span className="label ltr-iso pt-1.5 transition-colors group-hover:text-accent md:pt-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="display-md transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                      {p.title}
                    </h4>
                    <p className="col-start-2 mt-2 text-muted md:col-start-auto md:mt-0">{p.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
