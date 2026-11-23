"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LIMITS, validateContact } from "@/utils/validation";
import { siteConfig } from "@/data/site";

const initialValues = { name: "", email: "", subject: "", message: "", website: "" };

function Field({ id, label, error, required, requiredLabel, children }) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2 flex items-center justify-between">
        <span>{label}</span>
        {required && <span className="text-[10px] opacity-60">{requiredLabel}</span>}
      </label>
      {children}
      <p
        id={`${id}-error`}
        role={error ? "alert" : undefined}
        className={`overflow-hidden text-[13px] text-[#ff7a7a] transition-all duration-200 ${error ? "mt-2 max-h-10 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {error}
      </p>
    </div>
  );
}

const inputCls =
  "w-full border-0 border-b bg-transparent py-3 text-[1.05rem] text-fg placeholder:text-muted/60 transition-colors duration-200 focus:outline-none focus:border-accent";

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverError, setServerError] = useState("");
  const successRef = useRef(null);

  useEffect(() => {
    if (status === "success" && successRef.current) successRef.current.focus();
  }, [status]);

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(next));
  };
  const blur = (field) => () => {
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors(validateContact(values));
  };

  const errorText = (field) => (errors[field] && touched[field] ? t(`contact.errors.${errors[field]}`) : "");
  const fieldProps = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    onBlur: blur(field),
    "aria-invalid": errors[field] && touched[field] ? "true" : undefined,
    "aria-describedby": `contact-${field}-error`,
    className: `${inputCls} ${errors[field] && touched[field] ? "border-[#ff7a7a]" : "border-line"}`,
  });

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) {
      setStatus("error");
      setServerError("summary");
      const first = ["name", "email", "subject", "message"].find((f) => found[f]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang: i18n.language }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues(initialValues);
        setTouched({});
        setErrors({});
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setTouched({ name: true, email: true, subject: true, message: true });
        setServerError("summary");
      } else if (res.status === 429) setServerError("rate_limited");
      else if (res.status === 503) setServerError("not_configured");
      else setServerError("generic");
      setStatus("error");
    } catch {
      setServerError("network");
      setStatus("error");
    }
  };

  const reqLabel = t("contact.form.required");

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-accent/40 p-8 md:p-12"
          role="status"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mb-6 size-12 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M4 12.5l5 5L20 6.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
          </svg>
          <h3 ref={successRef} tabIndex={-1} className="display-md focus:outline-none">
            {t("contact.form.successTitle")}
          </h3>
          <p className="mt-4 max-w-md text-muted">{t("contact.form.successText")}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="link-underline mt-8 text-sm text-fg hover:text-accent"
          >
            {t("contact.form.again")}
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
          aria-busy={status === "loading"}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <Field id="contact-name" label={t("contact.form.name")} error={errorText("name")} required requiredLabel={reqLabel}>
              <input type="text" autoComplete="name" maxLength={LIMITS.name} placeholder={t("contact.form.namePlaceholder")} {...fieldProps("name")} />
            </Field>
            <Field id="contact-email" label={t("contact.form.email")} error={errorText("email")} required requiredLabel={reqLabel}>
              <input
                type="email"
                autoComplete="email"
                inputMode="email"
                dir="ltr"
                maxLength={LIMITS.email}
                placeholder={t("contact.form.emailPlaceholder")}
                {...fieldProps("email")}
                className={`${fieldProps("email").className} text-start rtl:text-right`}
              />
            </Field>
          </div>
          <Field id="contact-subject" label={t("contact.form.subject")} error={errorText("subject")} required requiredLabel={reqLabel}>
            <input type="text" maxLength={LIMITS.subject} placeholder={t("contact.form.subjectPlaceholder")} {...fieldProps("subject")} />
          </Field>
          <Field id="contact-message" label={t("contact.form.message")} error={errorText("message")} required requiredLabel={reqLabel}>
            <textarea rows={5} maxLength={LIMITS.message} placeholder={t("contact.form.messagePlaceholder")} {...fieldProps("message")} className={`${fieldProps("message").className} resize-y`} />
          </Field>

          {/* Honeypot anti-spam : invisible pour les humains */}
          <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
          </div>

          <div aria-live="polite">
            {status === "error" && serverError && (
              <div role="alert" className="border-s-2 border-[#ff7a7a] bg-[#ff7a7a]/5 px-4 py-3 text-[0.95rem] text-fg">
                <p>{t(`contact.errors.${serverError}`)}</p>
                {["not_configured", "generic", "network"].includes(serverError) && siteConfig.email && (
                  <p className="mt-1 text-muted">
                    {t("contact.form.fallback")}{" "}
                    <a href={`mailto:${siteConfig.email}`} className="ltr-iso link-underline text-accent">
                      {siteConfig.email}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-accent px-8 text-base font-medium text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                {t("contact.form.sending")}
              </>
            ) : (
              <>
                {t("contact.form.submit")}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
