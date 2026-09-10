import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/heading";
import { CtaBand } from "@/components/site/cta-band";
import { ChevronDownIcon } from "@/components/site/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Pura Vista Tours: cruise timing, cancellation, group sizes, payment, kids and accessibility.",
};

const faqs = [
  {
    q: "Will I get back to my cruise ship on time?",
    a: "Yes — it's the fixed point every itinerary is built around. We plan backwards from your all-aboard time with a buffer of at least an hour, and your guide tracks the schedule all day. If a ship's times change, tell us and we adjust.",
  },
  {
    q: "How does cancellation work?",
    a: "Every tour on this site is free to cancel up to 24 hours before the start time. Because you don't pay until the day, cancelling is just a message — there's nothing to refund. Weather cancellations on our side are always free.",
  },
  {
    q: "When and how do I pay?",
    a: "You pay your guide on the day, in US dollars or Costa Rican colones (cash), or by card. We confirm the exact total in writing when we reply to your enquiry, so there are no surprises.",
  },
  {
    q: "How big are the groups?",
    a: "It depends on the tour. 'Private' tours are just your party. 'Small group' tours are capped (typically 6–10 people). 'Shared' tours run in a van and top out at around 12. The group type is listed on every tour.",
  },
  {
    q: "What should I bring?",
    a: "Light clothes, a rain layer, closed shoes for trails, sunscreen, insect repellent, a hat and a swimsuit if your tour includes water. We provide bottled water and fruit. For ATV and canopy tours, wear clothes you don't mind getting muddy.",
  },
  {
    q: "Are the tours suitable for children?",
    a: "Most are. Walking tours, wildlife centres and boat trips work well for families. ATV and full zipline circuits have age and height minimums — ask us and we'll tell you what fits your group.",
  },
  {
    q: "Can you accommodate limited mobility?",
    a: "Often, yes. Several tours involve mostly flat walking or short boat rides, and private tours give us the most flexibility. Tell us what you need when you enquire and we'll be honest about which tours will and won't work.",
  },
  {
    q: "What's the difference between a shared and a private tour?",
    a: "A shared tour has a set route and other travellers in the vehicle at a lower price. A private tour is only your group, with flexible timing and stops, at a higher price. Both have the same guides and inclusions.",
  },
  {
    q: "Where do tours start?",
    a: "Cruise excursions meet you at the pier in Puerto Limón or Puntarenas. San José tours meet at a central point near the Plaza de la Cultura, or we can arrange hotel pickup for private bookings.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-jungle-800 text-white">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-100/70">
            Good to know
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-sand-100/80">
            Still unsure about something? Message us — we answer{" "}
            {site.responseTime}.
          </p>
        </Container>
      </div>

      <Container as="section" className="py-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers before you book"
          className="mb-8"
        />
        <div className="divide-y divide-black/10 border-y border-black/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-ink">
                {f.q}
                <ChevronDownIcon
                  width={20}
                  height={20}
                  className="shrink-0 text-ink/50 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/70">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
