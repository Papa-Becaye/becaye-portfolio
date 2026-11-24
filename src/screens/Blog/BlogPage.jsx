"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TechTag from "@/components/ui/TechTag";
import { formatPostDate } from "@/utils/formatDate";

const EASE = [0.22, 1, 0.36, 1];

function PostCard({ post, lang, featured = false, position = 1 }) {
  const { t } = useTranslation();
  const href = `/${lang}/blog/${post.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.42, delay: Math.min((position - 1) * 0.06, 0.3), ease: EASE }}
      className={`card-spotlight group flex flex-col overflow-hidden rounded-xl border border-line bg-bg-2 transition-colors duration-500 hover:border-accent/50 ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <Link href={href} tabIndex={-1} aria-hidden="true" className={`relative block overflow-hidden ${featured ? "min-h-64" : "aspect-[16/9]"}`}>
        <Image
          src={post.cover}
          alt={t("blog.coverAlt")}
          fill
          unoptimized
          priority={featured}
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </Link>

      <div className={`relative z-10 flex flex-col p-6 md:p-8 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <span className="label text-accent">{t(`blog.categories.${post.category}`)}</span>
          <span aria-hidden="true" className="h-px w-5 bg-line" />
          <span className="label ltr-iso">{formatPostDate(post.date, lang)}</span>
          <span className="label ltr-iso">· {t("blog.readTime", { minutes: post.readTime })}</span>
        </div>

        <h2 className={`font-display font-semibold leading-tight text-balance ${featured ? "display-md mt-5" : "mt-4 text-2xl"}`}>
          {post.title}
        </h2>
        <p className={`mt-4 max-w-xl text-pretty text-muted ${featured ? "text-base" : "text-[15px]"}`}>{post.excerpt}</p>

        {featured ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => <TechTag key={tag}>{tag}</TechTag>)}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <Button href={href} variant={featured ? "primary" : "ghost"} size="sm" icon="arrow">
            {t("blog.readArticle")}
          </Button>
          <span className="label ltr-iso opacity-60">{post.readTime}′</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage({ posts }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => ["all", ...new Set(posts.map((post) => post.category))], [posts]);
  const visible = useMemo(
    () => (category === "all" ? posts : posts.filter((post) => post.category === category)),
    [category, posts],
  );

  return (
    <>
      <PageHero
        index="02"
        eyebrow={t("blog.eyebrow")}
        title={t("blog.title")}
        intro={t("blog.intro")}
        meta={`${posts.length} ${lang === "en" ? "posts" : lang === "ar" ? "مقالات" : "articles"}`}
      />

      <section className="section-pad" aria-labelledby="blog-list-title">
        <div className="wrap">
          <h2 id="blog-list-title" className="sr-only">{t("blog.title").replace(/\*/g, "")}</h2>

          <Reveal className="mb-10 flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label mb-3">{t("blog.filtersLabel")}</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t("blog.filtersLabel")}>
                {categories.map((id) => {
                  const active = category === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setCategory(id)}
                      aria-pressed={active}
                      className={`relative rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                        active ? "border-accent text-bg" : "border-line text-muted hover:border-accent/60 hover:text-fg"
                      }`}
                    >
                      {active ? (
                        <motion.span
                          layoutId="blog-filter"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative z-10">{id === "all" ? t("blog.all") : t(`blog.categories.${id}`)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <a
              href={`/${lang}`}
              className="link-underline inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
            >
              {t("nav.home")}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </Reveal>

          <motion.div layout className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((post, i) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  lang={lang}
                  position={i + 1}
                  featured={category === "all" && i === 0 && post.featured}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 ? <p className="py-16 text-center text-muted">{t("blog.empty")}</p> : null}
        </div>
      </section>
    </>
  );
}
