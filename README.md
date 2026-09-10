# Wild Costa Rica Eco-Friendly Tours — Operations

An internal booking & departure management app for an eco-tour operator. Built with
Next.js (App Router) + TypeScript + Tailwind CSS. Runs on in-memory demo data
that reseeds whenever the server restarts — no database required.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's inside

| Area        | Route            | What you can do                                              |
| ----------- | ---------------- | ----------------------------------------------------------- |
| Dashboard   | `/`              | KPIs, next departures, recent bookings                       |
| Bookings    | `/bookings`      | Filter by status, open a booking, create a new one           |
| Booking     | `/bookings/[id]` | Change booking status; record payment (unpaid/deposit/paid)  |
| New booking | `/bookings/new`  | Pick customer + departure + party size (auto-prices)         |
| Departures  | `/departures`    | Upcoming / past / all; seat fill; overbook warnings          |
| Departure   | `/departures/[id]` | Passenger manifest, change status, add a booking           |
| Tours       | `/tours`         | Catalogue; add a tour                                        |
| Tour        | `/tours/[id]`    | Details + departures; schedule a new departure               |
| Customers   | `/customers`     | Contact list with spend; add a customer                      |
| Customer    | `/customers/[id]`| Profile + booking history                                    |

## Data model

`lib/types.ts` — `Tour`, `Departure`, `Customer`, `Booking`.
`lib/store.ts` — seed data, queries, and mutations (module-level singleton kept
on `globalThis` so it survives hot reload in dev).
`app/actions.ts` — server actions that wrap the store mutations.

## Next steps

- Swap `lib/store.ts` for a real database (Postgres + Prisma / Drizzle).
- Add auth for staff accounts.
- Add Stripe for deposits/balance payments.
- Enforce capacity on booking creation (currently overbooking is only flagged).
