import Link from "next/link";
import { notFound } from "next/navigation";
import { changeDepartureStatusAction } from "@/app/actions";
import {
  Badge,
  Card,
  PageHeader,
  Table,
  Td,
  Th,
  bookingTone,
  btnGhost,
  departureTone,
  paymentTone,
} from "@/components/ui";
import { currency, dateShort } from "@/lib/format";
import {
  bookingsForDeparture,
  customerName,
  getCustomer,
  getDeparture,
  getTour,
  seatsBooked,
} from "@/lib/store";
import type { DepartureStatus } from "@/lib/types";

const allStatuses: DepartureStatus[] = [
  "scheduled",
  "guaranteed",
  "full",
  "completed",
  "cancelled",
];

export default async function DepartureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dep = getDeparture(id);
  if (!dep) notFound();
  const tour = getTour(dep.tourId);
  const manifest = bookingsForDeparture(dep.id);
  const booked = seatsBooked(dep.id);
  const bookedValue = manifest
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.totalPrice, 0);

  return (
    <div>
      <PageHeader
        title={tour?.name ?? "Departure"}
        subtitle={`${dateShort(dep.startDate)} – ${dateShort(dep.endDate)} · Guide ${dep.guideName}`}
        action={
          <Link
            href="/departures"
            className="text-sm text-slate-500 hover:underline"
          >
            ← All departures
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="text-xs uppercase text-slate-500">Status</div>
          <div className="mt-1">
            <Badge tone={departureTone(dep.status)}>{dep.status}</Badge>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-slate-500">Seats</div>
          <div className="mt-1 text-xl font-semibold">
            {booked}/{dep.capacity}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-slate-500">Price / person</div>
          <div className="mt-1 text-xl font-semibold">{currency(dep.price)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-slate-500">Booked value</div>
          <div className="mt-1 text-xl font-semibold">
            {currency(bookedValue)}
          </div>
        </Card>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {allStatuses.map((s) => (
          <form
            key={s}
            action={changeDepartureStatusAction.bind(null, dep.id, s)}
          >
            <button className={btnGhost} disabled={dep.status === s}>
              Mark {s}
            </button>
          </form>
        ))}
        <Link
          href={`/bookings/new?departureId=${dep.id}`}
          className={btnGhost}
        >
          + Add booking
        </Link>
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Passenger manifest
      </h2>
      <Table
        head={
          <>
            <Th>Ref</Th>
            <Th>Customer</Th>
            <Th>Party</Th>
            <Th>Status</Th>
            <Th>Payment</Th>
            <Th>Paid</Th>
          </>
        }
      >
        {manifest.map((b) => {
          const c = getCustomer(b.customerId);
          return (
            <tr key={b.id} className="hover:bg-slate-50">
              <Td>
                <Link
                  className="font-medium text-slate-900 hover:underline"
                  href={`/bookings/${b.id}`}
                >
                  {b.reference}
                </Link>
              </Td>
              <Td>{c ? customerName(c) : "—"}</Td>
              <Td>{b.partySize}</Td>
              <Td>
                <Badge tone={bookingTone(b.status)}>{b.status}</Badge>
              </Td>
              <Td>
                <Badge tone={paymentTone(b.paymentStatus)}>
                  {b.paymentStatus}
                </Badge>
              </Td>
              <Td>
                {currency(b.amountPaid)} / {currency(b.totalPrice)}
              </Td>
            </tr>
          );
        })}
        {manifest.length === 0 && (
          <tr>
            <Td className="text-slate-400">No bookings yet</Td>
          </tr>
        )}
      </Table>
    </div>
  );
}
