import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/section";
import { TourCard } from "@/components/site/tour-card";
import { CtaBand } from "@/components/site/cta-band";
import { PinIcon } from "@/components/site/icons";
import { regions, toursByRegion, tours, priceRange } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All tours",
  description:
    "Every Oregon Tours Costa Rica shore excursion and day tour in Limón, Puntarenas and San José, with prices and durations.",
};

export default function ToursPage() {
  const { min, max } = priceRange();

  return (
    <>
      <div className="bg-jungle-800 text-white">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-100/70">
            The catalogue
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {tours.length} tours across three regions
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-sand-100/80">
            Prices are per person in US dollars and include guide, transport,
            entrance fees, boat rides, water and fruit. From ${min} to ${max}.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2">
            {regions.map((r) => (
              <a
                key={r.slug}
                href={`#${r.slug}`}
                className="rounded-full border border-white/25 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {r.short}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {regions.map((r) => {
        const list = toursByRegion(r.slug);
        return (
          <Container
            as="section"
            key={r.slug}
            id={r.slug}
            className="scroll-mt-24 py-16"
          >
            <Reveal>
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-jungle-600">
                  <PinIcon width={15} height={15} /> {r.kind}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
                  {r.name}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink/70">
                  {r.blurb}
                </p>
                <p className="mt-2 text-sm text-ink/50">
                  Pickup: {r.port}
                </p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((tour, i) => (
                <Reveal as="article" key={tour.slug} delay={(i % 3) * 80}>
                  <TourCard tour={tour} />
                </Reveal>
              ))}
            </div>
          </Container>
        );
      })}

      <CtaBand />
    </>
  );
}
