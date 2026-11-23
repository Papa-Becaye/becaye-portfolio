"use client";

import { useTranslation } from "react-i18next";
import { siteConfig } from "@/data/site";

const tone = {
  available: { dot: "bg-accent", ring: "bg-accent" },
  limited: { dot: "bg-[#f5b544]", ring: "bg-[#f5b544]" },
  unavailable: { dot: "bg-muted", ring: "bg-muted" },
};

/** Indicateur de disponibilité — configurable dans src/data/site.js */
export default function AvailabilityBadge({ short = false, className = "" }) {
  const { t } = useTranslation();
  const status = tone[siteConfig.availability] ? siteConfig.availability : "available";
  const label = t(`availability.${short ? `${status}Short` : status}`);
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} role="status">
      <span className="relative flex size-2">
        {status === "available" && (
          <span aria-hidden="true" className={`pulse-ring absolute inset-0 rounded-full ${tone[status].ring}`} />
        )}
        <span className={`relative size-2 rounded-full ${tone[status].dot}`} />
      </span>
      <span className="label text-fg/80 ar-no-upper">{label}</span>
    </span>
  );
}
