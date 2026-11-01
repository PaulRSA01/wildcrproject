import { site } from "@/lib/site";

/**
 * Brand mark: the Eco Pulse Agami heron artwork (public/brand-icon.png,
 * background removed so it reads cleanly over both the dark hero and the
 * light solid header/footer). Sized "medium" so it reads as the site's
 * identity the moment the homepage opens, not a favicon-sized afterthought.
 */
export function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand-icon.png"
        alt=""
        width={320}
        height={320}
        className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
      />
      {showText && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {site.shortName}
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] opacity-70 sm:text-xs">
            Costa Rica
          </span>
        </span>
      )}
    </span>
  );
}
