"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiryAction, type EnquiryState } from "@/app/actions";
import { site, waLink, mailtoLink } from "@/lib/site";
import { WhatsAppIcon, MailIcon, CheckIcon } from "@/components/site/icons";

const initial: EnquiryState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-jungle-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-jungle-700 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send enquiry"}
    </button>
  );
}

export function EnquiryForm({
  tourSlug,
  tourTitle,
  compact = false,
}: {
  tourSlug?: string;
  tourTitle?: string;
  compact?: boolean;
}) {
  const [state, formAction] = useActionState(submitEnquiryAction, initial);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    guests: "2",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  if (state.ok) {
    const summary = [
      tourTitle ? `Tour: ${tourTitle}` : null,
      form.preferredDate ? `Date: ${form.preferredDate}` : null,
      `Guests: ${form.guests}`,
      form.name ? `Name: ${form.name}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    return (
      <div className="rounded-xl2 border border-jungle-200 bg-jungle-50 p-6 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-jungle-600 text-white">
          <CheckIcon width={24} height={24} />
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold text-ink">
          Thanks, {form.name.split(" ")[0] || "traveller"}!
        </h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-ink/70">
          Your enquiry is in. We usually reply {site.responseTime}. Want a faster
          answer? Reach us directly:
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <a
            href={waLink(
              `Hi ${site.name}, I just sent an enquiry. ${summary}`,
            )}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-jungle-600 px-4 py-2 text-sm font-semibold text-white hover:bg-jungle-700"
          >
            <WhatsAppIcon width={16} height={16} /> WhatsApp
          </a>
          <a
            href={mailtoLink(
              tourTitle ? `Enquiry: ${tourTitle}` : "Tour enquiry",
              summary,
            )}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-jungle-300 px-4 py-2 text-sm font-semibold text-jungle-700 hover:bg-white"
          >
            <MailIcon width={16} height={16} /> Email
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-xl2 border border-black/5 bg-white p-6 shadow-sm"
    >
      {tourTitle && (
        <p className="mb-4 rounded-lg bg-jungle-50 px-3 py-2 text-sm text-jungle-800">
          Enquiry for <strong>{tourTitle}</strong>
        </p>
      )}
      <input type="hidden" name="tourSlug" value={tourSlug ?? ""} />
      <input type="hidden" name="tourTitle" value={tourTitle ?? ""} />

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Name" required>
          <input
            name="name"
            required
            value={form.name}
            onChange={set("name")}
            className={inputClass}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            className={inputClass}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone / WhatsApp">
          <input
            name="phone"
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
            autoComplete="tel"
          />
        </Field>
        <Field label="Preferred date">
          <input
            name="preferredDate"
            type="date"
            value={form.preferredDate}
            onChange={set("preferredDate")}
            className={inputClass}
          />
        </Field>
        <Field label="Guests">
          <input
            name="guests"
            type="number"
            min={1}
            max={40}
            value={form.guests}
            onChange={set("guests")}
            className={inputClass}
          />
        </Field>
        <Field label="Cruise ship / hotel">
          <input
            name="message"
            value={form.message}
            onChange={set("message")}
            placeholder="e.g. NCL Bliss, or Hotel Presidente"
            className={inputClass}
          />
        </Field>
      </div>

      {state.error && (
        <p className="mt-3 text-sm text-rose-600">{state.error}</p>
      )}

      <div className="mt-5">
        <SubmitButton />
        <p className="mt-2 text-center text-xs text-ink/50">
          No payment now. We reply with a firm price and pickup time.
        </p>
      </div>
    </form>
  );
}

const inputClass =
  "mt-1 w-full rounded-lg border border-black/10 bg-sand-50 px-3 py-2 text-sm text-ink outline-none transition focus:border-jungle-500 focus:ring-2 focus:ring-jungle-500/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-ink/80">
      {label}
      {required && <span className="text-rose-500"> *</span>}
      {children}
    </label>
  );
}
