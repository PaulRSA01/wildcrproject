import Link from "next/link";
import {
  Badge,
  Card,
  PageHeader,
  Table,
  Td,
  Th,
  bookingTone,
  departureTone,
  paymentTone,
} from "@/components/ui";
import { currency, dateShort, today } from "@/lib/format";
import {
  customerName,
  getCustomer,
  getDeparture,
  getTour,
  listBookings,
  listDepartures,
  metrics,
  seatsBooked,
} from "@/lib/store";

export default function DashboardPage() {
  const m = metrics();
  const cutoff = today();
  const upcoming = listDepartures()
    .filter(
      (d) =>
        d.startDate >= cutoff &&
        d.status !== "completed" &&
        d.status !== "cancelled",
    )
    .slice(0, 6);
  const recent = listBookings().slice(0, 6);

  const stats = [
    { label: "Upcoming departures", value: m.upcomingDepartures },
    { label: "Active bookings", value: m.activeBookings },
    { label: "Travelers booked", value: m.travelers },
    { label: "Revenue booked", value: currency(m.revenueBooked) },
    { label: "Cash collected", value: currency(m.revenueCollected) },
    { label: "Seat fill (upcoming)", value: `${Math.round(m.fillRate * 100)}%` },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Operational snapshot across all tours"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {s.label}
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Next departures
      </h2>
      <Table
        head={
          <>
            <Th>Tour</Th>
            <Th>Dates</Th>
            <Th>Guide</Th>
            <Th>Seats</Th>
            <Th>Status</Th>
          </>
        }
      >
        {upcoming.map((d) => {
          const tour = getTour(d.tourId);
          return (
            <tr key={d.id} className="hover:bg-slate-50">
              <Td>
                <Link
                  className="font-medium text-slate-900 hover:underline"
                  href={`/admin/departures/${d.id}`}
                >
                  {tour?.name}
                </Link>
              </Td>
              <Td>
                {dateShort(d.startDate)} &ndash; {dateShort(d.endDate)}
              </Td>
              <Td>{d.guideName}</Td>
              <Td>
                {seatsBooked(d.id)}/{d.capacity}
              </Td>
              <Td>
                <Badge tone={departureTone(d.status)}>{d.status}</Badge>
              </Td>
            </tr>
          );
        })}
      </Table>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Recent bookings
      </h2>
      <Table
        head={
          <>
            <Th>Ref</Th>
            <Th>Customer</Th>
            <Th>Tour</Th>
            <Th>Party</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th>Payment</Th>
          </>
        }
      >
        {recent.map((b) => {
          const c = getCustomer(b.customerId);
          const d = getDeparture(b.departureId);
          const tour = d ? getTour(d.tourId) : undefined;
          return (
            <tr key={b.id} className="hover:bg-slate-50">
              <Td>
                <Link
                  className="font-medium text-slate-900 hover:underline"
                  href={`/admin/bookings/${b.id}`}
                >
                  {b.reference}
                </Link>
              </Td>
              <Td>{c ? customerName(c) : "—"}</Td>
              <Td>{tour?.name ?? "—"}</Td>
              <Td>{b.partySize}</Td>
              <Td>{currency(b.totalPrice)}</Td>
              <Td>
                <Badge tone={bookingTone(b.status)}>{b.status}</Badge>
              </Td>
              <Td>
                <Badge tone={paymentTone(b.paymentStatus)}>
                  {b.paymentStatus}
                </Badge>
              </Td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
