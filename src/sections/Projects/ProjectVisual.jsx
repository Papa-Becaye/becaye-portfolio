"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

/**
 * Visuel de projet.
 * - Si `project.image` est renseigné (vraie capture) → image optimisée, lazy.
 * - Sinon → composition graphique abstraite (squelette d'interface), clairement
 *   étiquetée « aperçu graphique » : ce n'est pas une fausse capture d'écran.
 */
export default function ProjectVisual({ project, name, priority = false, className = "" }) {
  const { t } = useTranslation();
  const address = project.url ? project.url.replace(/^https?:\/\//, "") : name.toLowerCase().replace(/\s+/g, "-");
  const rows = project.index === "01" ? "cards" : "list";

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-line bg-bg-2 transition-colors duration-500 group-hover:border-accent/50 ${className}`}
    >
      {/* barre de navigateur */}
      <div dir="ltr" className="flex items-center gap-3 border-b border-line bg-bg/70 px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </div>
        <div className="mx-auto w-full max-w-[16rem] truncate rounded-full bg-surface px-3 py-1 text-center font-mono text-[10px] text-muted">
          {address}
        </div>
        <span className="w-9" aria-hidden="true" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt || name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            dir="ltr"
            aria-hidden="true"
            className="absolute inset-0 flex transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          >
            <div className="grid-bg absolute inset-0 opacity-60" />
            {/* barre latérale */}
            <div className="relative hidden w-[17%] shrink-0 space-y-2.5 border-e border-line bg-bg/40 p-4 sm:block">
              <div className="h-2 w-3/4 rounded-full bg-accent/80" />
              {[60, 80, 50, 70, 40].map((w, i) => (
                <div key={i} className="h-2 rounded-full bg-line" style={{ width: `${w}%` }} />
              ))}
            </div>
            {/* contenu */}
            <div className="relative flex flex-1 flex-col p-4 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-1/4 rounded-full bg-line" />
                <div className="flex gap-2">
                  <div className="size-5 rounded-full border border-line" />
                  <div className="size-5 rounded-full bg-line" />
                </div>
              </div>
              <p className="mt-auto font-display text-[clamp(2.2rem,8.5vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.04em] text-fg/95">
                {name}
                <span className="text-accent">.</span>
              </p>
              {rows === "cards" ? (
                <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-4">
                  {[0, 1, 2].map((n) => (
                    <div key={n} className="rounded border border-line bg-bg/50 p-2.5 sm:p-3.5">
                      <div className="h-1.5 w-1/2 rounded-full bg-line" />
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line sm:mt-4">
                        <div className={`h-full rounded-full ${n === 1 ? "bg-accent" : "bg-muted/60"}`} style={{ width: `${[72, 46, 88][n]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  {[0, 1, 2].map((n) => (
                    <div key={n} className="flex items-center gap-3 rounded border border-line bg-bg/50 px-3 py-2.5">
                      <span className={`size-2 rounded-full ${n === 0 ? "bg-accent" : "bg-line"}`} />
                      <div className="h-1.5 rounded-full bg-line" style={{ width: `${[55, 38, 46][n]}%` }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {!project.image && (
          <span className="label absolute bottom-3 end-3 rounded bg-bg/80 px-2 py-1 text-[10px] backdrop-blur">
            {t("projects.previewLabel")}
          </span>
        )}
      </div>
    </div>
  );
}
