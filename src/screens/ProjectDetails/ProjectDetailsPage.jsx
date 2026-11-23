"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import TechTag from "@/components/ui/TechTag";
import { projects } from "@/data/projects";
import ProjectVisual from "@/sections/Projects/ProjectVisual";

function Row({ title, index, children }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
      <div className="md:col-span-4">
        <p className="label ltr-iso mb-3 text-accent">{String(index).padStart(2, "0")}</p>
        <h2 className="display-md">{title}</h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </Reveal>
  );
}

function Architecture({ data }) {
  return (
    <div>
      <p className="max-w-2xl text-lg text-muted text-pretty">{data.text}</p>
      <div className="relative mt-10 rounded-lg border border-dashed border-line p-4 pt-8 md:p-6 md:pt-10">
        <span className="label absolute -top-2.5 start-5 bg-bg px-2 text-accent">{data.wrapper}</span>
        <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {data.layers.map((layer, i) => (
            <Fragment key={layer.name}>
              <li className="flex-1 rounded border border-line bg-bg-2 px-4 py-3.5 transition-colors hover:border-accent/60">
                <p className="label mb-1.5">{layer.name}</p>
                <p className="ltr-iso font-mono text-[13px] text-fg">{layer.tech}</p>
              </li>
              {i < data.layers.length - 1 && (
                <li aria-hidden="true" className="flex justify-center text-accent">
                  <ArrowRight className="size-4 rotate-90 lg:rotate-0 rtl:lg:-scale-x-100" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function ProjectDetailsPage({ slug }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  if (!project) return null;

  const base = `projects.items.${project.key}`;
  const name = t(`${base}.name`);
  const d = (path, opts) => t(`${base}.details.${path}`, opts);
  const has = (path) => i18n.exists(`${base}.details.${path}`);

  let n = 0;
  const next = projects[(idx + 1) % projects.length];
  const showNext = projects.length > 1;
  const nextName = t(`projects.items.${next.key}.name`);

  return (
    <article className="pb-24 pt-28 md:pt-36">
      <div className="wrap">
        <Reveal>
          <Link
            href={`/${lang}#projects`}
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
            {t("projects.back")}
          </Link>
        </Reveal>

        <header className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal as="p" delay={0.05} className="label mb-5 flex items-center gap-3">
              <span className="ltr-iso text-accent">{project.index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-line" />
              {t(`${base}.kind`)}
            </Reveal>
            <Reveal as="h1" delay={0.1} className="display-xl">
              {name}
              <span className="text-accent">.</span>
            </Reveal>
            <Reveal as="p" delay={0.15} className="mt-8 max-w-2xl font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium leading-[1.3] text-pretty">
              {t(`${base}.summary`)}
            </Reveal>
            <Reveal as="p" delay={0.2} className="mt-5 max-w-2xl text-lg text-muted text-pretty">
              {t(`${base}.intro`)}
            </Reveal>
            {project.url && (
              <Reveal delay={0.25} className="mt-9">
                <Button href={project.url} icon="up-right" external>
                  {t("projects.visit")}
                  <span className="sr-only"> {t("a11y.externalLink")}</span>
                </Button>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.2} as="dl" className="grid content-start gap-6 border-t border-line pt-6 text-[0.95rem] lg:col-span-4 lg:border-t-0 lg:pt-2">
            <div>
              <dt className="label mb-2">{t("projects.categoryLabel")}</dt>
              <dd>{t(`${base}.category`)}</dd>
            </div>
            <div>
              <dt className="label mb-2">{t("projects.roleLabel")}</dt>
              <dd>{t(`${base}.role`)}</dd>
            </div>
            <div>
              <dt className="label mb-3">{t("projects.stackLabel")}</dt>
              <dd className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <TechTag key={s}>{s}</TechTag>
                ))}
              </dd>
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.1} className="group mt-14 md:mt-20">
          <ProjectVisual project={project} name={name} priority />
        </Reveal>

        <div className="mt-20 md:mt-28">
          {has("overview") && (
            <Row title={d("overview.title")} index={++n}>
              <p className="max-w-2xl text-lg text-muted text-pretty">{d("overview.text")}</p>
            </Row>
          )}
          {has("problem") && (
            <Row title={d("problem.title")} index={++n}>
              <p className="max-w-2xl text-lg text-muted text-pretty">{d("problem.text")}</p>
            </Row>
          )}
          {has("vision") && (
            <Row title={d("vision.title")} index={++n}>
              <p className="max-w-2xl font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium leading-[1.3] text-pretty">
                {d("vision.text")}
              </p>
            </Row>
          )}
          {has("solution") && (
            <Row title={d("solution.title")} index={++n}>
              <p className="max-w-2xl text-lg text-muted text-pretty">{d("solution.text")}</p>
              <p className="label mb-3 mt-8">{d("solution.actorsLabel")}</p>
              <ul className="flex flex-wrap gap-2.5">
                {d("solution.actors", { returnObjects: true }).map((a) => (
                  <li key={a} className="rounded-full border border-line px-4 py-1.5 text-[13px] text-fg/90">
                    {a}
                  </li>
                ))}
              </ul>
            </Row>
          )}
          {has("role") && (
            <Row title={d("role.title")} index={++n}>
              <p className="max-w-2xl text-lg text-muted text-pretty">{d("role.text")}</p>
            </Row>
          )}
          {has("features") && (
            <Row title={d("features.title")} index={++n}>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {d("features.items", { returnObjects: true }).map((f, i) => (
                  <li key={f} className="group bg-bg p-6 transition-colors hover:bg-surface">
                    <span className="label ltr-iso mb-4 block transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-medium leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </Row>
          )}
          {has("stack") && (
            <Row title={d("stack.title")} index={++n}>
              <ul className="border-b border-line">
                {d("stack.items", { returnObjects: true }).map((s) => (
                  <li key={s.name} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <span className="ltr-iso font-mono text-[13px] text-accent">{s.name}</span>
                    <span className="text-muted">{s.role}</span>
                  </li>
                ))}
              </ul>
            </Row>
          )}
          {has("architecture") && (
            <Row title={d("architecture.title")} index={++n}>
              <Architecture data={d("architecture", { returnObjects: true })} />
            </Row>
          )}
          {has("perspectives") && (
            <Row title={d("perspectives.title")} index={++n}>
              <p className="label mb-5 text-accent">{d("perspectives.note")}</p>
              <ul className="space-y-4">
                {d("perspectives.items", { returnObjects: true }).map((p) => (
                  <li key={p} className="flex gap-4 text-lg text-muted">
                    <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 bg-accent" />
                    <span className="text-pretty">{p}</span>
                  </li>
                ))}
              </ul>
            </Row>
          )}
          {has("note") && (
            <Reveal as="p" className="label ltr-iso-none border-t border-line pt-8 leading-relaxed normal-case">
              {"// "}
              {d("note")}
            </Reveal>
          )}
        </div>

        {showNext && (
          <Reveal as="nav" aria-label={t("projects.next")} className="mt-20 border-t border-line pt-10">
            <p className="label mb-4">{t("projects.next")}</p>
            <Link
              href={`/${lang}/projects/${next.slug}`}
              className="group flex items-end justify-between gap-6"
            >
              <span className="display-xl transition-colors group-hover:text-accent">{nextName}</span>
              <ArrowRight aria-hidden="true" className="mb-3 size-8 shrink-0 text-muted transition-all group-hover:translate-x-2 group-hover:text-accent rtl:-scale-x-100 rtl:group-hover:-translate-x-2 md:size-12" />
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
