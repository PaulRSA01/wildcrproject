import Link from "next/link";
import type { CatalogTour } from "@/lib/catalog";
import { regionShort, tourImage } from "@/lib/catalog";
import { TourImage } from "@/components/site/tour-image";
import { ClockIcon, UsersIcon, CheckIcon } from "@/components/site/icons";

export function TourCard({ tour }: { tour: CatalogTour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <TourImage
          src={tourImage(tour)}
          alt={tour.title}
          scene={tour.scene}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-jungle-700 shadow-sm">
          {regionShort(tour.region)}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-jungle-700 px-3 py-1 text-sm font-semibold text-white shadow">
          from ${tour.priceUSD}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {tour.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
          {tour.tagline}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink/60">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon width={15} height={15} /> {tour.durationHours}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon width={15} height={15} /> {tour.groupType}
          </span>
          {tour.freeCancellation && (
            <span className="inline-flex items-center gap-1.5 text-jungle-600">
              <CheckIcon width={15} height={15} /> Free cancellation
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
