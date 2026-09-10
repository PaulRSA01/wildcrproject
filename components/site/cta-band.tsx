import Link from "next/link";
import { Container } from "@/components/site/container";
import { TrustBar } from "@/components/site/trust-bar";
import { site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/site/icons";

export function CtaBand({
  title = "Sailing into Limón or Puntarenas?",
  text = "Tell us your ship and date. We'll build a day that fits your schedule and gets you back aboard with time to spare.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-jungle-800 py-16 text-white sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-sand-100/80">{text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-jungle-800 transition hover:bg-sand-100"
            >
              Plan my trip
            </Link>
            <a
              href={waLink(
                `Hi ${site.name} — I'd like to plan a tour. My date is `,
              )}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <WhatsAppIcon width={18} height={18} /> Message on WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-10">
          <TrustBar variant="onDark" />
        </div>
      </Container>
    </section>
  );
}
