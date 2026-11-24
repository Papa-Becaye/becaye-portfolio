"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TechTag from "@/components/ui/TechTag";
import ProjectVisual from "@/sections/Projects/ProjectVisual";

const EASE = [0.22, 1, 0.36, 1];

function ProjectCard({ project, lang, featured, position }) {
  const { t } = useTranslation();
  const base = `projects.items.${project.key}`;
  const name = t(`${base}.name`);
  const caseHref = `/${lang}/projects/${project.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.42, delay: Math.min((position - 1) * 0.06, 0.3), ease: EASE }}
      className={`card-spotlight group relative flex flex-col overflow-hidden rounded-xl border bg-bg-2 transition-colors duration-500 ${
        featured
          ? "border-accent/35 lg:col-span-2 lg:grid lg:grid-cols-2"
          : "border-line hover:border-accent/50"
      }`}
    >
      <div className="relative min-w-0">
        <Link href={caseHref} tabIndex={-1} aria-hidden="true" className="block h-full">
          <ProjectVisual project={project} name={name} priority={featured} className="h-full rounded-none border-0" />
        </Link>
        {featured ? (
          <span className="label absolute start-4 top-4 rounded-full border border-accent/40 bg-bg/85 px-3 py-1.5 text-accent backdrop-blur">
            {t("realisations.featured")}
          </span>
        ) : null}
      </div>

      <div className={`relative z-10 flex flex-col p-6 md:p-8 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="label ltr-iso text-accent">{project.index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line" />
          <span className="label">{t(`${base}.category`)}</span>
        </div>

        <h2 className={`font-display font-semibold leading-tight ${featured ? "display-md mt-5" : "mt-5 text-2xl"}`}>
          {name}
          <span className="text-accent">.</span>
        </h2>
        <p className={`mt-4 max-w-xl text-pretty text-muted ${featured ? "text-base" : "text-[15px]"}`}>
          {t(`${base}.summary`)}
        </p>

        <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <dt className="label">{t("realisations.roleLabel")}</dt>
            <dd className="text-fg/90">{t(`${base}.role`)}</dd>
          </div>
          <div>
            <dt className="label mb-2">{t("realisations.stackLabel")}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {(project.stack || []).slice(0, featured ? 8 : 5).map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
              {!featured && project.stack?.length > 5 ? (
                <span className="label ltr-iso self-center">+{project.stack.length - 5}</span>
              ) : null}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          <Button href={caseHref} variant={featured ? "primary" : "secondary"} size="sm" icon="arrow">
            {t("realisations.viewCase")}
          </Button>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/site inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-muted transition-colors hover:text-accent"
              aria-label={`${name} — ${t("a11y.externalLink")}`}
            >
              <span className="ltr-iso">{t("realisations.visit")}</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover/site:-translate-y-0.5 group-hover/site:translate-x-0.5" />
            </a>
          ) : null}
          <span className="label ltr-iso ms-auto opacity-60">{String(position).padStart(2, "0")}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function RealisationsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [filter, setFilter] = useState("all");

  const filters = useMemo(
    () => ["all", ...new Set(projects.flatMap((project) => project.filters || []))],
    [],
  );
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => (project.filters || []).includes(filter))),
    [filter],
  );

  const labelFor = (id) => (id === "all" ? t("realisations.all") : t(`realisations.filters.${id}`));

  return (
    <>
      <PageHero
        index="01"
        eyebrow={t("realisations.eyebrow")}
        title={t("realisations.title")}
        intro={t("realisations.intro")}
        meta={t("realisations.count", { count: visible.length })}
      />

      <section className="section-pad" aria-labelledby="realisations-list-title">
        <div className="wrap">
          <h2 id="realisations-list-title" className="sr-only">
            {t("realisations.title").replace(/\*/g, "")}
          </h2>

          <Reveal className="mb-10 flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label mb-3">{t("realisations.filtersLabel")}</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t("realisations.filtersLabel")}>
                {filters.map((id) => {
                  const active = filter === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFilter(id)}
                      aria-pressed={active}
                      className={`relative rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                        active ? "border-accent text-bg" : "border-line text-muted hover:border-accent/60 hover:text-fg"
                      }`}
                    >
                      {active ? (
                        <motion.span
                          layoutId="realisations-filter"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative z-10">{labelFor(id)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="label ltr-iso md:mb-1">{t("realisations.count", { count: visible.length })}</p>
          </Reveal>

          <motion.div layout className="grid gap-6 md:gap-8 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  lang={lang}
                  featured={Boolean(project.featured && filter === "all")}
                  position={i + 1}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-muted">{t("realisations.empty")}</p>
          ) : null}
        </div>
      </section>

      <Reveal as="section" className="border-t border-line bg-bg-2 py-16 md:py-24">
        <div className="wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="label mb-3">{t("footer.tagline")}</p>
            <p className="display-md max-w-2xl text-balance">{t("entrepreneurship.statement")}</p>
          </div>
          <Button href={`/${lang}#contact`} variant="secondary" icon="arrow">
            {t("hero.ctaContact")}
          </Button>
        </div>
      </Reveal>
    </>
  );
}
