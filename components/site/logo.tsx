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
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand-icon.png"
        alt=""
        width={320}
        height={320}
        className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
      />
      {showText && (
        <span className="font-display text-xl font-semibold leading-none tracking-tight">
          {site.shortName}
        </span>
      )}
    </span>
  );
}
