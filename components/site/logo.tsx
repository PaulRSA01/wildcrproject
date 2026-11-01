import { site } from "@/lib/site";

/**
 * Brand mark: the Eco Pulse Agami heron artwork (public/brand-icon.png,
 * background removed so it reads cleanly over both the dark hero and the
 * light solid header/footer).
 *
 * `size="lg"` (~3x "md") is for the main site header, where the brand gets
 * the most visual weight. "md" is kept for the footer and the (narrow,
 * w-56) admin sidebar, where the "lg" scale would overflow and wrap.
 */
const sizes = {
  md: {
    gap: "gap-3",
    icon: "h-14 w-14 sm:h-16 sm:w-16",
    name: "text-xl sm:text-2xl",
    sub: "text-[0.7rem] sm:text-xs",
  },
  lg: {
    gap: "gap-5",
    icon: "h-[10.5rem] w-[10.5rem] sm:h-48 sm:w-48",
    name: "text-6xl sm:text-7xl",
    sub: "text-[2.1rem] sm:text-4xl",
  },
} as const;

export function Logo({
  className = "",
  showText = true,
  size = "md",
}: {
  className?: string;
  showText?: boolean;
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand-icon.png"
        alt=""
        width={320}
        height={320}
        className={`shrink-0 rounded-full object-cover ${s.icon}`}
      />
      {showText && (
        <span className="flex flex-col leading-tight">
          <span className={`font-display font-semibold tracking-tight ${s.name}`}>
            {site.shortName}
          </span>
          <span
            className={`font-semibold uppercase tracking-[0.2em] opacity-70 ${s.sub}`}
          >
            Costa Rica
          </span>
        </span>
      )}
    </span>
  );
}
