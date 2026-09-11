# Oregon Tours Costa Rica

Marketing + enquiry website for a Costa Rica shore-excursion / day-tour operator,
with the original internal operations tool kept alongside it. Next.js (App Router)
+ TypeScript + Tailwind CSS. All data is in-memory demo data that reseeds on server
restart — no database.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Public site

| Page        | Route            | What's there                                             |
| ----------- | ---------------- | ------------------------------------------------------- |
| Home        | `/`              | Hero, regions, featured tours, value props, reviews, CTA |
| Tours       | `/tours`         | All 12 tours grouped by region (Limón / Puntarenas / SJO)|
| Tour detail | `/tours/[slug]`  | Overview, itinerary, inclusions, enquiry form, WhatsApp  |
| About       | `/about`         | Story, regions, values                                   |
| FAQ         | `/faq`           | Accordion + `FAQPage` JSON-LD                            |
| Contact     | `/contact`       | Enquiry form + direct contact details                    |

- Tour catalogue: `lib/catalog.ts` (static). Names/prices mirror a real operator
  at the client's request; all descriptive copy is original.
- Brand + contact constants: `lib/site.ts` — **replace the placeholder email,
  phone, WhatsApp number and social URLs before launch.**
- Enquiries: `submitEnquiryAction` in `app/actions.ts` → `lib/enquiries.ts`
  (in-memory log). The form then offers WhatsApp / email as a direct follow-up.
- Artwork is hand-built inline SVG (`components/site/tour-art.tsx`) — no image
  files, renders identically offline. Swap for photos by editing that component
  and `components/site/tour-card.tsx`.

## Operations tool (internal)

Moved under `/admin` (was at the root). Behaviour is unchanged.

| Area        | Route                  |
| ----------- | ---------------------- |
| Dashboard   | `/admin`               |
| Bookings    | `/admin/bookings`, `/admin/bookings/new`, `/admin/bookings/[id]` |
| Departures  | `/admin/departures`, `/admin/departures/[id]` |
| Tours       | `/admin/tours`, `/admin/tours/[id]` |
| Customers   | `/admin/customers`, `/admin/customers/[id]` |

`lib/store.ts` — seed data, queries and mutations (module singleton on
`globalThis`). `lib/types.ts` — `Tour`, `Departure`, `Customer`, `Booking`.

## Layout structure

- `app/layout.tsx` — minimal root (`<html>` + fonts + metadata) only.
- `app/(site)/layout.tsx` — public header + footer.
- `app/admin/layout.tsx` — the operations sidebar.

## Next steps

- Swap `lib/store.ts` / `lib/enquiries.ts` for a real database.
- Add auth for `/admin`.
- Wire enquiries to email/CRM; optionally surface them as leads in `/admin`.
- Replace placeholder contact details and add real photography.
