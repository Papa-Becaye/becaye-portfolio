"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "@/components/ui/Reveal";
import TechTag from "@/components/ui/TechTag";
import { formatPostDate } from "@/utils/formatDate";

export default function ArticlePage({ post, next, content }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line pb-12 pt-28 md:pb-16 md:pt-36">
        <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-35" />
        <div className="wrap relative">
          <Reveal>
            <Link
              href={`/${lang}/blog`}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
              {t("blog.back")}
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label text-accent">{t(`blog.categories.${post.category}`)}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line" />
            <span className="label ltr-iso">{t("blog.published")} {formatPostDate(post.date, lang)}</span>
            <span className="label ltr-iso inline-flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="size-3.5" />
              {t("blog.readTime", { minutes: post.readTime })}
            </span>
          </Reveal>

          <Reveal as="h1" delay={0.1} className="display-lg mt-6 max-w-[22ch] text-balance">
            {post.title}
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-2xl text-lg text-muted text-pretty md:text-xl">
            {post.excerpt}
          </Reveal>
        </div>
      </header>

      <div className="wrap">
        <Reveal className="relative mt-10 aspect-[21/9] overflow-hidden rounded-xl border border-line bg-surface md:mt-14">
          <Image
            src={post.cover}
            alt={t("blog.coverAlt")}
            fill
            unoptimized
            priority
            sizes="(min-width: 1280px) 1320px, 100vw"
            className="object-cover"
          />
        </Reveal>

        <div className="grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <Reveal className="prose-blog min-w-0 max-w-[70ch]">{content}</Reveal>

          <Reveal as="aside" delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-t border-line pt-5">
              <p className="label">{t("blog.tagsLabel")}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => <TechTag key={tag}>{tag}</TechTag>)}
              </div>
            </div>
            <div className="mt-8 border-t border-line pt-5">
              <p className="label">{t("blog.published")}</p>
              <p className="mt-2 text-sm ltr-iso">{formatPostDate(post.date, lang)}</p>
              <p className="label mt-5">{t("blog.readTime", { minutes: post.readTime })}</p>
            </div>
          </Reveal>
        </div>

        {next ? (
          <Reveal as="section" className="mb-16 border-t border-line pt-10 md:pt-14">
            <p className="label mb-4">{t("blog.next")}</p>
            <Link
              href={`/${lang}/blog/${next.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-line bg-bg-2 p-6 transition-colors hover:border-accent/50 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div>
                <p className="label text-accent">{t(`blog.categories.${next.category}`)}</p>
                <h2 className="mt-2 font-display text-xl font-semibold md:text-2xl">{next.title}</h2>
              </div>
              <ArrowRight aria-hidden="true" className="size-6 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}
