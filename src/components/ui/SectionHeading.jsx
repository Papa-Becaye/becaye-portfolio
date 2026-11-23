"use client";

import Reveal from "./Reveal";
import renderAccent from "@/utils/renderAccent";

/** En-tête de section éditorial : index mono + filet + titre display. */
export default function SectionHeading({ index, eyebrow, title, intro, titleId, className = "" }) {
  return (
    <header className={`mb-14 md:mb-20 ${className}`}>
      <Reveal className="mb-8 flex items-center gap-4">
        <span className="label text-accent ltr-iso">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-line md:w-20" />
        <span className="label">{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" id={titleId} delay={0.05} className="display-lg max-w-[18ch] text-balance">
        {renderAccent(title)}
      </Reveal>
      {intro ? (
        <Reveal as="p" delay={0.12} className="mt-6 max-w-xl text-lg text-muted text-pretty">
          {intro}
        </Reveal>
      ) : null}
    </header>
  );
}
