import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jungle-600 dark:text-jungle-300">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-sand-50 sm:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-3 text-base leading-relaxed text-ink/70 dark:text-sand-100/70">
          {lead}
        </p>
      )}
    </div>
  );
}
