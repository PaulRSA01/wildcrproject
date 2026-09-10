import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/section";
import { SectionHeading } from "@/components/site/heading";
import { ValueProps } from "@/components/site/value-props";
import { CtaBand } from "@/components/site/cta-band";
import { PinIcon } from "@/components/site/icons";
import { regions, tours } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a locally owned tour operator running shore excursions and day tours in Limón, Puntarenas and San José.`,
};

const stats = [
  { value: `${tours.length}`, label: "tours we run ourselves" },
  { value: "3", label: "regions covered" },
  { value: "100%", label: "licensed local guides" },
  { value: "0", label: "resold or subcontracted trips" },
];

export default function AboutPage() {
  return (
    <>
      <div className="bg-jungle-800 text-white">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-100/70">
            About
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A small Costa Rican operator, not a booking desk
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand-100/80">
            {site.name} was started by guides and drivers who were tired of
            watching visitors get rushed through the country in oversized groups.
            We run our own trips, with our own people, in the three places we
            know best.
          </p>
        </Container>
      </div>

      <Container as="section" className="py-16">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Our story" title="Why we do it this way" />
              <div className="mt-4 space-y-4 text-ink/75">
                <p>
                  Costa Rica is small enough to see a lot in a day and fragile
                  enough that how you see it matters. We keep groups small, work
                  with community-run stops and rescue centres, and build every
                  itinerary backwards from the moment you need to be back — at
                  the ship, the airport or your hotel.
                </p>
                <p>
                  Because we operate the tours ourselves, we can move a pickup by
                  fifteen minutes, swap a stop when the tide is wrong, or wait
                  out a rain shower without it derailing the day. There is no
                  call centre between you and the person driving the van.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 self-start">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl2 border border-black/5 bg-white p-5 text-center shadow-sm"
                >
                  <div className="font-display text-3xl font-semibold text-jungle-700">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-ink/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>

      <div className="bg-white py-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Three regions, one standard"
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {regions.map((r) => (
              <Reveal
                as="article"
                key={r.slug}
                className="rounded-xl2 border border-black/5 bg-sand-50 p-6"
              >
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-jungle-600">
                  <PinIcon width={14} height={14} /> {r.short}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {r.blurb}
                </p>
                <Link
                  href={`/tours#${r.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-jungle-700 hover:text-jungle-800"
                >
                  See {r.short} tours →
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      <Container as="section" className="py-16">
        <Reveal>
          <SectionHeading
            eyebrow="What you can count on"
            title="The things we won't cut"
          />
        </Reveal>
        <Reveal className="mt-10">
          <ValueProps />
        </Reveal>
      </Container>

      <CtaBand
        title="Have a date in mind?"
        text="Tell us where you'll be and what you'd like to see. We'll put together a day that works."
      />
    </>
  );
}
