import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/section";
import { TourArt } from "@/components/site/tour-art";
import { TourCard } from "@/components/site/tour-card";
import { EnquiryForm } from "@/components/site/enquiry-form";
import {
  ClockIcon,
  UsersIcon,
  CheckIcon,
  MinusIcon,
  PinIcon,
  WhatsAppIcon,
  MailIcon,
} from "@/components/site/icons";
import {
  getTourBySlug,
  tours,
  relatedTours,
  regionName,
} from "@/lib/catalog";
import { site, waLink, mailtoLink } from "@/lib/site";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.title,
    description: tour.tagline,
    openGraph: { title: tour.title, description: tour.tagline },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = relatedTours(tour);
  const waMessage = `Hi ${site.name}, I'm interested in "${tour.title}" ($${tour.priceUSD} pp). My date is `;

  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-jungle-800 text-white">
        <TourArt
          scene={tour.scene}
          className="absolute inset-0 h-full w-full opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle-900 via-jungle-900/60 to-jungle-900/30" />
        <Container className="relative py-16 sm:py-20">
          <nav className="text-sm text-sand-100/70">
            <Link href="/tours" className="hover:text-white">
              Tours
            </Link>
            <span className="px-2">/</span>
            <Link href={`/tours#${tour.region}`} className="hover:text-white">
              {regionName(tour.region)}
            </Link>
          </nav>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {tour.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand-100/85">
            {tour.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-sand-100/90">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon width={16} height={16} /> {tour.durationHours}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UsersIcon width={16} height={16} /> {tour.groupType}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PinIcon width={16} height={16} /> {regionName(tour.region)}
            </span>
            {tour.freeCancellation && (
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon width={16} height={16} /> Free cancellation
              </span>
            )}
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_22rem]">
        {/* Main column */}
        <div className="max-w-prose">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Overview
            </h2>
            <p className="mt-3 leading-relaxed text-ink/75">{tour.overview}</p>
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Highlights
            </h2>
            <ul className="mt-4 space-y-2.5">
              {tour.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink/75">
                  <CheckIcon
                    width={18}
                    height={18}
                    className="mt-0.5 shrink-0 text-jungle-600"
                  />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-ink">
              A typical day
            </h2>
            <ol className="mt-5 space-y-5 border-l-2 border-jungle-100 pl-6">
              {tour.itinerary.map((stop, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full border-2 border-jungle-500 bg-white" />
                  <div className="flex items-baseline gap-2">
                    {stop.time && (
                      <span className="font-mono text-xs font-semibold text-jungle-600">
                        {stop.time}
                      </span>
                    )}
                    <h3 className="font-semibold text-ink">{stop.title}</h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">
                    {stop.detail}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-ink/50">
              Timings are approximate and adjusted to your ship's all-aboard time.
            </p>
          </Reveal>

          <Reveal className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl2 border border-black/5 bg-white p-5">
              <h3 className="font-semibold text-ink">What's included</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/75">
                {tour.includes.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <CheckIcon
                      width={16}
                      height={16}
                      className="mt-0.5 shrink-0 text-jungle-600"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl2 border border-black/5 bg-white p-5">
              <h3 className="font-semibold text-ink">Not included</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/60">
                {tour.notIncluded.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <MinusIcon
                      width={16}
                      height={16}
                      className="mt-0.5 shrink-0 text-ink/40"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Sticky booking card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl2 border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-ink/55">from</span>
              <span className="font-display text-3xl font-semibold text-ink">
                ${tour.priceUSD}
              </span>
            </div>
            <p className="text-right text-xs text-ink/50">per person</p>
            <dl className="mt-4 space-y-2 border-t border-black/5 pt-4 text-sm">
              <Row label="Duration" value={tour.durationHours} />
              <Row label="Group" value={tour.groupType} />
              <Row label="Region" value={regionName(tour.region)} />
              <Row
                label="Cancellation"
                value={tour.freeCancellation ? "Free" : "See terms"}
              />
            </dl>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={waLink(waMessage)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-jungle-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-jungle-700"
              >
                <WhatsAppIcon width={16} height={16} /> Ask on WhatsApp
              </a>
              <a
                href={mailtoLink(`Enquiry: ${tour.title}`)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sand-50"
              >
                <MailIcon width={16} height={16} /> Email us
              </a>
            </div>
          </div>
        </aside>
      </Container>

      {/* Enquiry form */}
      <div className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Request this tour
            </h2>
            <p className="mt-2 text-sm text-ink/65">
              Send the details and we'll confirm availability, pickup and a firm
              price — usually {site.responseTime}.
            </p>
            <div className="mt-6">
              <EnquiryForm tourSlug={tour.slug} tourTitle={tour.title} />
            </div>
          </div>
        </Container>
      </div>

      {related.length > 0 && (
        <Container as="section" className="py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">
            More in {regionName(tour.region)}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink/55">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
