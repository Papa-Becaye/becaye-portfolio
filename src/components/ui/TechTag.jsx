/** Étiquette technique (monospace, toujours LTR). */
export default function TechTag({ children, className = "" }) {
  return (
    <span
      className={`ltr-iso inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/60 hover:text-fg ${className}`}
    >
      {children}
    </span>
  );
}
