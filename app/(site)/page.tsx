import Link from "next/link";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/section";
import { SectionHeading } from "@/components/site/heading";
import { TourImage } from "@/components/site/tour-image";
import { TrustBar } from "@/components/site/trust-bar";
import { RegionCards } from "@/components/site/region-cards";
import { TourCard } from "@/components/site/tour-card";
import { ValueProps } from "@/components/site/value-props";
import { Steps } from "@/components/site/steps";
import { Testimonials } from "@/components/site/testimonials";
import { CtaBand } from "@/components/site/cta-band";
import { ArrowIcon } from "@/components/site/icons";
import { featuredTours, tours, priceRange } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = featuredTours();
  const { min } = priceRange();

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-16 flex min-h-[92vh] items-center overflow-hidden">
        <TourImage
          src="/img/tours/hero.jpg"
          alt="A jungle river winding through the Costa Rican rainforest"
          scene="hero"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(19,38,29,0.92) 0%, rgba(19,38,29,0.6) 42%, rgba(19,38,29,0.15) 100%), linear-gradient(to top, rgba(19,38,29,0.7) 0%, rgba(19,38,29,0) 55%)",
          }}
        />
        <Container className="relative pt-24 pb-16 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand-100/80">
            Costa Rica · Limón · Puntarenas · San José
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Shore excursions and day tours, run by people who live here.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100/85">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-jungle-800 shadow-lg transition hover:bg-sand-100"
            >
              Browse all tours <ArrowIcon width={16} height={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Plan my trip
            </Link>
          </div>
          <p className="mt-6 text-sm text-sand-100/70">
            {tours.length} tours · from ${min} per person · free cancellation
          </p>
        </Container>
      </section>

      {/* Trust bar */}
      <Container className="relative z-10 -mt-10">
        <Reveal>
          <TrustBar />
        </Reveal>
      </Container>

      {/* Regions */}
      <Container as="section" className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Where we operate"
            title="Three ways to see Costa Rica"
            lead="Pick the coast your ship calls at, or the capital if you're staying in the Central Valley. Every tour is built around your return time."
          />
        </Reveal>
        <Reveal className="mt-10">
          <RegionCards />
        </Reveal>
      </Container>

      {/* Featured tours */}
      <div className="bg-white py-20">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Most booked"
                title="Popular experiences"
                lead="A cross-section of what travellers choose most, from reef snorkels to canopy ziplines to the capital on foot."
              />
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-jungle-700 hover:text-jungle-800"
              >
                See all {tours.length} tours <ArrowIcon width={16} height={16} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((tour, i) => (
              <Reveal as="article" key={tour.slug} delay={(i % 3) * 80}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      {/* Value props */}
      <Container as="section" className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Why travel with us"
            title="Small operator, high standards"
            lead="We run our own trips — no reselling, no oversized buses. That means tighter timing, better guides and a real person on the other end of your message."
          />
        </Reveal>
        <Reveal className="mt-10">
          <ValueProps />
        </Reveal>
      </Container>

      {/* How it works */}
      <div className="bg-white py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Booking takes about a minute"
            />
          </Reveal>
          <Reveal className="mt-10">
            <Steps />
          </Reveal>
        </Container>
      </div>

      {/* Testimonials */}
      <Container as="section" className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="What travellers say"
            align="center"
            className="mb-10"
          />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
      </Container>

      <CtaBand />
    </>
  );
}
