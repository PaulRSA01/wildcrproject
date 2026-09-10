import { site } from "@/lib/site";

export function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <circle cx="20" cy="20" r="19" className="fill-current opacity-10" />
        <circle cx="20" cy="15" r="6.5" className="fill-current opacity-90" />
        <path
          d="M20 34c0-7 4-12 12-13-1 8-5 13-12 13Z"
          className="fill-current"
        />
        <path
          d="M20 34c0-7-4-12-12-13 1 8 5 13 12 13Z"
          className="fill-current opacity-70"
        />
      </svg>
      {showText && (
        <span className="font-display text-lg font-semibold leading-none tracking-tight">
          {site.shortName}
        </span>
      )}
    </span>
  );
}
