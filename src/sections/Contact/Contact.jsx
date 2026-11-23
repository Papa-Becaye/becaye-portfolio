"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { getChannels } from "@/utils/channels";
import renderAccent from "@/utils/renderAccent";
import ContactForm from "./ContactForm";

export default function Contact() {
  const { t } = useTranslation();
  const channels = getChannels();

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative">
      <div className="wrap">
        <Reveal className="mb-8 flex items-center gap-4">
          <span className="label ltr-iso text-accent">06</span>
          <span aria-hidden="true" className="h-px w-10 bg-line md:w-20" />
          <span className="label">{t("contact.label")}</span>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="h2" id="contact-title" delay={0.05} className="display-lg text-balance">
              {renderAccent(t("contact.title"))}
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-8 max-w-md text-lg text-muted text-pretty">
              {t("contact.description")}
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <AvailabilityBadge />
              <p className="label mt-3">{siteConfig.location}</p>
            </Reveal>

            {channels.length > 0 && (
              <Reveal delay={0.2} className="mt-12">
                <h3 className="label mb-4">{t("contact.channels")}</h3>
                <ul className="border-t border-line">
                  {channels.map((c) => (
                    <li key={c.id}>
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:border-accent"
                      >
                        <span className="label w-24 shrink-0 transition-colors group-hover:text-accent">{t(`contact.${c.id}`)}</span>
                        <span className="ltr-iso min-w-0 flex-1 truncate text-end font-display text-lg font-medium rtl:text-start">
                          {c.display}
                        </span>
                        <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:text-accent rtl:-scale-x-100" />
                        {c.external && <span className="sr-only">{t("a11y.externalLink")}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="lg:col-span-7 lg:ps-10">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
