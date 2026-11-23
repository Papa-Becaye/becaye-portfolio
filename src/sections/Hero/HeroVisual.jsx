"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/* Chaque ligne = liste de [texte, classe]. Le code reste toujours LTR. */
const kw = "text-muted";
const str = "text-accent";
const key = "text-fg";
const pn = "text-muted";
const cm = "text-muted/55";

const lines = [
  [["// from problem to product", cm]],
  [["const ", kw], ["becaye", key], [" = {", pn]],
  [["  role", key], [": ", pn], ['"Full Stack Developer"', str], [",", pn]],
  [["  base", key], [": ", pn], ['"Dakar, SN"', str], [",", pn]],
  [["  approach", key], [": [", pn]],
  [['    "understand the problem"', str], [",", pn]],
  [['    "build the solution"', str], [",", pn]],
  [['    "create real impact"', str], [",", pn]],
  [["  ],", pn]],
  [["  open", key], [": ", pn], ["true", str], [",", pn]],
  [["};", pn]],
  [[" ", pn]],
  [["await ", kw], ["ship", key], ["(becaye);", pn]],
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.7 } },
};
const row = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

function ArchitectureStrip() {
  const nodes = ["UI", "API", "DB", "VPS"];
  return (
    <div className="flex items-center gap-2 rounded-md border border-line bg-surface p-3.5 shadow-2xl shadow-black/40 sm:gap-3">
      {nodes.map((node, i) => (
        <div key={node} className="flex items-center gap-2 sm:gap-3">
          <span
            className={`rounded border px-2.5 py-1.5 font-mono text-[10px] ${
              i === 0 ? "border-accent/70 text-accent" : "border-line text-fg/80"
            }`}
          >
            {node}
          </span>
          {i < nodes.length - 1 && (
            <span className="relative block h-px w-5 bg-line sm:w-8">
              <motion.span
                aria-hidden="true"
                className="absolute -top-[2px] size-[5px] rounded-full bg-accent"
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.45,
                }}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Composition « environnement de développement » : éditeur + terminal + schéma d'architecture. */
export default function HeroVisual() {
  const { t } = useTranslation();
  return (
    <div dir="ltr" className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:mb-10 lg:ms-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-lg border border-line bg-bg-2 shadow-2xl shadow-black/50"
      >
        {/* barre de titre */}
        <div className="flex items-center border-b border-line bg-bg/60">
          <div className="flex gap-1.5 px-4">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-accent" />
          </div>
          <div className="relative border-s border-line bg-bg-2 px-4 py-2.5 font-mono text-[11px] text-fg/90">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />
            becaye.config.js
          </div>
        </div>

        {/* code */}
        <motion.pre
          variants={container}
          initial="hidden"
          animate="show"
          className="overflow-hidden px-4 py-5 font-mono text-[12px] leading-[1.85] sm:px-5 sm:text-[13px]"
          aria-label="becaye.config.js"
        >
          {lines.map((tokens, i) => (
            <motion.div key={i} variants={row} className="flex">
              <span aria-hidden="true" className="w-7 shrink-0 select-none pe-3 text-end text-muted/40">
                {i + 1}
              </span>
              <code className="whitespace-pre">
                {tokens.map(([text, cls], j) => (
                  <span key={j} className={cls}>
                    {text}
                  </span>
                ))}
                {i === lines.length - 1 && (
                  <span aria-hidden="true" className="caret ms-0.5 inline-block h-[1.05em] w-[7px] translate-y-[3px] bg-accent" />
                )}
              </code>
            </motion.div>
          ))}
        </motion.pre>

        {/* terminal */}
        <div className="border-t border-line bg-bg px-4 py-3 font-mono text-[11px] text-muted sm:px-5">
          <p>
            <span className="text-accent">$</span> docker compose up -d
          </p>
          <p className="mt-1">
            <span className="text-accent">✓</span> {t("hero.terminalReady")}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-4 flex justify-end lg:absolute lg:-bottom-[4.25rem] lg:-start-12 lg:mt-0"
      >
        <ArchitectureStrip />
      </motion.div>
    </div>
  );
}
