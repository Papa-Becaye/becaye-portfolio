"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Reveal from "@/components/ui/Reveal";
import renderAccent from "@/utils/renderAccent";

function Marquee({ words }) {
  const row = [...words, ...words];
  return (
    <div aria-hidden="true" dir="ltr" className="marquee overflow-hidden border-b border-line py-6 md:py-8">
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${n}-${i}`} className="flex items-center">
                <span className="outline-text-strong px-6 font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-none md:px-10">
                  {w}
                </span>
                <span className="size-2.5 shrink-0 bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Flow({ steps }) {
  return (
    <div dir="ltr" className="relative mt-12 max-w-md" aria-label={steps.join(" → ")} role="img">
      <div className="relative flex items-center justify-between">
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute inset-x-0 top-1/2 h-px origin-left bg-line"
        />
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-accent"
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
        {steps.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`relative size-4 rounded-full border ${i === steps.length - 1 ? "border-accent bg-accent" : "border-muted bg-bg-2"}`}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        {steps.map((s, i) => (
          <span key={i} className={`label ${i === steps.length - 1 ? "text-accent" : ""} ${i === 1 ? "text-center" : ""}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Entrepreneurship() {
  const { t } = useTranslation();
  const themes = t("entrepreneurship.themes", { returnObjects: true });
  const marquee = t("entrepreneurship.marquee", { returnObjects: true });
  const flow = t("entrepreneurship.flow", { returnObjects: true });

  return (
    <section id="vision" aria-labelledby="vision-title" className="relative overflow-hidden border-y border-line bg-bg-2">
      <Marquee words={marquee} />

      <div className="wrap section-pad grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal className="mb-8 flex items-center gap-4">
              <span className="label ltr-iso text-accent">05</span>
              <span aria-hidden="true" className="h-px w-10 bg-line md:w-16" />
              <span className="label">{t("entrepreneurship.eyebrow")}</span>
            </Reveal>
            <Reveal as="h2" id="vision-title" delay={0.05} className="display-lg text-balance">
              {renderAccent(t("entrepreneurship.title"))}
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-8 max-w-md text-lg text-muted text-pretty">
              {t("entrepreneurship.statement")}
            </Reveal>
            <Reveal delay={0.15}>
              <Flow steps={flow} />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal as="h3" className="label mb-6 text-accent">
            {t("entrepreneurship.themesTitle")}
          </Reveal>
          <ol className="border-t border-line">
            {themes.map((theme, i) => (
              <Reveal
                as="li"
                key={theme.title}
                delay={0.03}
                tabIndex={0}
                className="group grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-line py-5 outline-offset-0 md:grid-cols-[4rem_1fr] md:py-6"
              >
                <span className="label ltr-iso pt-2 transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-[clamp(1.35rem,2.6vw,2.1rem)] font-semibold leading-tight text-fg/70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-fg group-focus-visible:text-fg rtl:group-hover:-translate-x-1.5">
                    {theme.title}
                  </h4>
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <p className="max-w-lg pt-3 text-muted text-pretty">{theme.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
