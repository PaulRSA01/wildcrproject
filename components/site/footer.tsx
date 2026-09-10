import Link from "next/link";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { site, waLink, mailtoLink } from "@/lib/site";
import { regions } from "@/lib/catalog";
import { WhatsAppIcon, MailIcon } from "@/components/site/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-jungle-900 text-sand-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-sand-50" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand-100/70">
            {site.tagline}. Locally owned and guided in Limón, Puntarenas and San
            José.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sand-100/60">
            Destinations
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {regions.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/tours#${r.slug}`}
                  className="text-sand-100/85 hover:text-white"
                >
                  {r.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tours" className="text-sand-100/85 hover:text-white">
                All tours
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sand-100/60">
            Company
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-sand-100/85 hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-sand-100/85 hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sand-100/85 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sand-100/60">
            Get in touch
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={waLink(`Hi ${site.name} — I have a question about your tours.`)}
                className="inline-flex items-center gap-2 text-sand-100/85 hover:text-white"
              >
                <WhatsAppIcon width={16} height={16} /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={mailtoLink("Tour enquiry")}
                className="inline-flex items-center gap-2 text-sand-100/85 hover:text-white"
              >
                <MailIcon width={16} height={16} /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-sand-100/60 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <Link href="/admin" className="hover:text-sand-100">
            Staff login
          </Link>
        </Container>
      </div>
    </footer>
  );
}
