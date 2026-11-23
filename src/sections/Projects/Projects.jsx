"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TechTag from "@/components/ui/TechTag";
import { projects } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";

function ProjectCtas({ project, lang, t }) {
  const detailHref = `/${lang}/projects/${project.slug}`;
  return (
    <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap">
      <Button href={detailHref}>
        {t(project.type === "experience" ? "projects.viewExperience" : "projects.viewCase")}
      </Button>
      {project.url && (
        <Button href={project.url} variant="secondary" icon="up-right" external>
          {t("projects.visit")}
          <span className="sr-only"> {t("a11y.externalLink")}</span>
        </Button>
      )}
    </div>
  );
}

function ProjectFeature({ project, lang, t, index }) {
  const base = `projects.items.${project.key}`;
  const name = t(`${base}.name`);
  const detailHref = `/${lang}/projects/${project.slug}`;
  const reversed = index % 2 === 1;

  const visual = (
    <Link href={detailHref} aria-label={`${t(project.type === "experience" ? "projects.viewExperience" : "projects.viewCase")} — ${name}`} className="relative block">
      <ProjectVisual project={project} name={name} priority={index === 0} />
      <span className="pointer-events-none absolute bottom-5 start-5 hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-bg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex md:translate-y-2">
        {t(project.type === "experience" ? "projects.viewExperience" : "projects.viewCase")}
        <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
      </span>
    </Link>
  );

  const meta = (
    <dl className="grid gap-6 text-[0.95rem]">
      <div>
        <dt className="label mb-2">{t("projects.categoryLabel")}</dt>
        <dd className="text-fg/90">{t(`${base}.category`)}</dd>
      </div>
      <div>
        <dt className="label mb-2">{t("projects.roleLabel")}</dt>
        <dd className="text-fg/90">{t(`${base}.role`)}</dd>
      </div>
      <div>
        <dt className="label mb-3">{t("projects.stackLabel")}</dt>
        <dd className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <TechTag key={s}>{s}</TechTag>
          ))}
        </dd>
      </div>
    </dl>
  );

  if (!reversed) {
    return (
      <article className="group">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 md:mb-8">
          <div>
            <p className="label mb-4 flex items-center gap-3">
              <span className="ltr-iso text-accent">{project.index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-line" />
              {t(`${base}.kind`)}
            </p>
            <h3 className="display-xl">
              <Link href={detailHref} className="transition-colors hover:text-accent">
                {name}
              </Link>
            </h3>
          </div>
        </Reveal>
        <Reveal delay={0.05}>{visual}</Reveal>
        <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium leading-[1.3] text-pretty">
              {t(`${base}.summary`)}
            </p>
            <p className="mt-5 max-w-xl text-muted text-pretty">{t(`${base}.intro`)}</p>
            <div className="mt-8">
              <ProjectCtas project={project} lang={lang} t={t} />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            {meta}
          </Reveal>
        </div>
      </article>
    );
  }

  return (
    <article className="group grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
      <Reveal delay={0.05} className="lg:order-2 lg:col-span-7 lg:col-start-6">
        {visual}
      </Reveal>
      <div className="lg:order-1 lg:col-span-5">
        <Reveal>
          <span
            aria-hidden="true"
            dir="ltr"
            className="outline-text-strong mb-4 block font-display text-[clamp(5rem,14vw,10rem)] font-bold leading-[0.8]"
          >
            {project.index}
          </span>
          <p className="label mb-4">{t(`${base}.kind`)}</p>
          <h3 className="display-lg">
            <Link href={detailHref} className="transition-colors hover:text-accent">
              {name}
            </Link>
          </h3>
          <p className="mt-6 text-lg text-fg/90 text-pretty">{t(`${base}.summary`)}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-8">
          {meta}
          <div className="mt-8">
            <ProjectCtas project={project} lang={lang} t={t} />
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad relative">
      <div className="wrap">
        <SectionHeading
          titleId="projects-title"
          index="03"
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          intro={t("projects.intro")}
        />
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} lang={lang} t={t} index={i} />
          ))}
        </div>
        <Reveal as="p" className="label mt-24 flex items-center gap-4 md:mt-32">
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <span className="ltr-iso text-accent">{"// "}</span>
          {t("projects.more")}
        </Reveal>
      </div>
    </section>
  );
}
