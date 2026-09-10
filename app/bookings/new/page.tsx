import Link from "next/link";
import { createBookingAction } from "@/app/actions";
import { Card, PageHeader, btn, input } from "@/components/ui";
import { currency, dateShort, today } from "@/lib/format";
import { getTour, listCustomers, listDepartures, seatsLeft } from "@/lib/store";

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ departureId?: string }>;
}) {
  const { departureId } = await searchParams;
  const customers = listCustomers();
  const cutoff = today();
  const departures = listDepartures().filter(
    (d) => d.startDate >= cutoff && d.status !== "cancelled",
  );

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="New booking"
        action={
          <Link
            href="/bookings"
            className="text-sm text-slate-500 hover:underline"
          >
            ← Bookings
          </Link>
        }
      />

      <Card className="p-6">
        <form action={createBookingAction} className="space-y-4">
          <label className="block text-sm">
            Customer
            <select
              name="customerId"
              required
              defaultValue=""
              className={input}
            >
              <option value="" disabled>
                Select a customer…
              </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName} — {c.email}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            Departure
            <select
              name="departureId"
              required
              defaultValue={departureId ?? ""}
              className={input}
            >
              <option value="" disabled>
                Select a departure…
              </option>
              {departures.map((d) => {
                const tour = getTour(d.tourId);
                return (
                  <option key={d.id} value={d.id}>
                    {tour?.name} — {dateShort(d.startDate)} —{" "}
                    {currency(d.price)}/pp — {seatsLeft(d)} seats left
                  </option>
                );
              })}
            </select>
          </label>

          <label className="block text-sm">
            Party size
            <input
              name="partySize"
              type="number"
              min={1}
              defaultValue={2}
              required
              className={input}
            />
          </label>

          <p className="text-xs text-slate-500">
            Booking is created as <strong>pending / unpaid</strong>. Confirm it
            and record payment from the booking page.
          </p>

          <button className={btn}>Create booking</button>
        </form>
      </Card>
    </div>
  );
}
