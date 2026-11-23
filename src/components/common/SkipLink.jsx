"use client";

import { useTranslation } from "react-i18next";

export default function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-transform focus:translate-y-0"
    >
      {t("a11y.skip")}
    </a>
  );
}
