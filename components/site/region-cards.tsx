import Link from "next/link";
import { regions, toursByRegion } from "@/lib/catalog";
import type { SceneKey } from "@/lib/catalog";
import { TourImage } from "@/components/site/tour-image";
import { ArrowIcon } from "@/components/site/icons";

const art: Record<string, { scene: SceneKey; src: string }> = {
  limon: { scene: "rainforest", src: "/img/tours/rainforest.jpg" },
  puntarenas: { scene: "pacific", src: "/img/tours/pacific.jpg" },
  "san-jose": { scene: "theatre", src: "/img/tours/theatre.jpg" },
};

export function RegionCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {regions.map((r) => {
        const count = toursByRegion(r.slug).length;
        const a = art[r.slug];
        return (
          <Link
            key={r.slug}
            href={`/tours#${r.slug}`}
            className="group relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-xl2 p-6 text-white shadow-sm"
          >
            <TourImage
              src={a?.src}
              alt={r.name}
              scene={a?.scene ?? "rainforest"}
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jungle-900/90 via-jungle-900/35 to-jungle-900/10" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider text-sand-100/80">
                {count} tours · {r.kind}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">{r.name}</h3>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-sand-100/90">
                Explore <ArrowIcon width={16} height={16} />
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
