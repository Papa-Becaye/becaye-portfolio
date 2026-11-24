"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const EASE = [0.22, 1, 0.36, 1];

/** En-tête de page éditorial : révélation des mots du titre, ligne par ligne. */
export default function PageHero({ index, eyebrow, title, intro, meta }) {
  const segments = title.split(/(\*[^*]+\*)/g).filter(Boolean);
  const words = [];
  segments.forEach((segment) => {
    const accent = segment.startsWith("*") && segment.endsWith("*");
    const text = accent ? segment.slice(1, -1) : segment;
    text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => words.push({ word, accent }));
  });

  return (
    <header className="relative overflow-hidden border-b border-line pb-12 pt-28 md:pb-16 md:pt-36">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="wrap relative">
        <Reveal className="mb-8 flex flex-wrap items-center gap-4">
          <span className="label text-accent ltr-iso">{index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-line md:w-20" />
          <span className="label">{eyebrow}</span>
          {meta ? <span className="label ms-auto ltr-iso">{meta}</span> : null}
        </Reveal>

        <h1 className="display-lg max-w-[20ch] text-balance">
          {words.map(({ word, accent }, i) => (
            <span key={`${word}-${i}`} className="me-[0.22em] inline-block overflow-hidden align-bottom last:me-0">
              <motion.span
                className={`inline-block ${accent ? "text-accent" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.055, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {intro ? (
          <Reveal as="p" delay={0.35} className="mt-7 max-w-2xl text-lg text-muted text-pretty md:text-xl">
            {intro}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
