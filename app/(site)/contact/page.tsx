import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { EnquiryForm } from "@/components/site/enquiry-form";
import {
  WhatsAppIcon,
  MailIcon,
  PhoneIcon,
  ShipIcon,
  ClockIcon,
} from "@/components/site/icons";
import { site, waLink, mailtoLink, telLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} to plan a shore excursion or day tour in Costa Rica.`,
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-jungle-800 text-white">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-100/70">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Let's plan your day
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-sand-100/80">
            Send the form and we'll reply with availability, a pickup time and a
            firm price. Prefer to chat? WhatsApp is the fastest way to reach us.
          </p>
        </Container>
      </div>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Send an enquiry
          </h2>
          <p className="mt-2 text-sm text-ink/65">
            No payment now — this just starts the conversation.
          </p>
          <div className="mt-6">
            <EnquiryForm />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl2 border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">Reach us directly</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={waLink(`Hi ${site.name}, I'd like to plan a tour.`)}
                  className="inline-flex items-center gap-2.5 text-ink/80 hover:text-jungle-700"
                >
                  <WhatsAppIcon width={18} height={18} className="text-jungle-600" />
                  WhatsApp chat
                </a>
              </li>
              <li>
                <a
                  href={mailtoLink("Tour enquiry")}
                  className="inline-flex items-center gap-2.5 text-ink/80 hover:text-jungle-700"
                >
                  <MailIcon width={18} height={18} className="text-jungle-600" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={telLink}
                  className="inline-flex items-center gap-2.5 text-ink/80 hover:text-jungle-700"
                >
                  <PhoneIcon width={18} height={18} className="text-jungle-600" />
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-xl2 border border-black/5 bg-white p-6 shadow-sm text-sm text-ink/70">
            <p className="flex items-center gap-2.5">
              <ClockIcon width={18} height={18} className="text-jungle-600" />
              Replies {site.responseTime}
            </p>
            <p className="mt-3 flex items-start gap-2.5">
              <ShipIcon
                width={18}
                height={18}
                className="mt-0.5 shrink-0 text-jungle-600"
              />
              Cruise pickups at the Puerto Limón and Puntarenas piers. San José
              tours meet in the city centre.
            </p>
            <p className="mt-3">
              Serving {site.regionsServed.join(", ")}.
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
