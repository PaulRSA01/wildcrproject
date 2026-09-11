/**
 * Single source of truth for brand + contact details.
 *
 * TODO (client): replace the placeholder contact values below with the real
 * business email, phone and WhatsApp number, and the real social URLs.
 */

export interface ValueProp {
  icon:
    | "shield"
    | "leaf"
    | "ship"
    | "users"
    | "clock"
    | "star";
  title: string;
  text: string;
}

export const site = {
  name: "Oregon Tours Costa Rica",
  shortName: "Oregon Tours",
  tagline: "Costa Rica eco-tours, shore excursions & private day trips",
  description:
    "Small-group and private eco-tours in Limón, Puntarenas and San José — certified local guides, premium transport and every fee included, with a guaranteed on-time return to your ship.",

  // --- contact (placeholders) ---
  email: "hello@oregontourscostarica.com", // TODO: real address
  phoneDisplay: "+506 8000 0000", // TODO: real number
  whatsapp: "50680000000", // TODO: digits only, country code first, for wa.me

  regionsServed: ["Limón", "Puntarenas", "San José"] as const,

  social: {
    facebook: "#", // TODO
    instagram: "#", // TODO
    youtube: "#", // TODO
  },

  responseTime: "within a few hours, 7 days a week",

  valueProps: [
    {
      icon: "shield",
      title: "Certified local guides",
      text: "ICT-licensed naturalist and cultural guides who grew up in the regions they show you.",
    },
    {
      icon: "ship",
      title: "Back to your ship on time",
      text: "Cruise itineraries are planned backwards from your all-aboard time — with a comfortable buffer built in.",
    },
    {
      icon: "leaf",
      title: "Low-impact by design",
      text: "Small groups, community-run stops and rescue centres rather than roadside animal photo-ops.",
    },
    {
      icon: "star",
      title: "One clear price",
      text: "Park fees, boat rides, transport, water and fresh fruit are all included — no surprises on the day.",
    },
  ] satisfies ValueProp[],
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject: string, body = "") => {
  const query = new URLSearchParams({ subject });
  if (body) query.set("body", body);
  return `mailto:${site.email}?${query.toString()}`;
};

export const telLink = `tel:${site.phoneDisplay.replace(/[^+\d]/g, "")}`;
