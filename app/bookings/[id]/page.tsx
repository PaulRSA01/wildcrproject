import Link from "next/link";
import { notFound } from "next/navigation";
import {
  changeBookingStatusAction,
  changePaymentStatusAction,
} from "@/app/actions";
import {
  Badge,
  Card,
  PageHeader,
  bookingTone,
  btnGhost,
  paymentTone,
} from "@/components/ui";
import { currency, dateShort } from "@/lib/format";
import {
  customerName,
  getBooking,
  getCustomer,
  getDeparture,
  getTour,
} from "@/lib/store";
import type { BookingStatus, PaymentStatus } from "@/lib/types";

const statuses: BookingStatus[] = ["pending", "confirmed", "cancelled"];
const payments: PaymentStatus[] = ["unpaid", "deposit", "paid", "refunded"];

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const b = getBooking(id);
  if (!b) notFound();
  const c = getCustomer(b.customerId);
  const d = getDeparture(b.departureId);
  const tour = d ? getTour(d.tourId) : undefined;

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={b.reference}
        subtitle={tour?.name}
        action={
          <Link
            href="/bookings"
            className="text-sm text-slate-500 hover:underline"
          >
            ← Bookings
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Trip
          </h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Tour</dt>
              <dd>
                {tour ? (
                  <Link className="hover:underline" href={`/tours/${tour.id}`}>
                    {tour.name}
                  </Link>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Departure</dt>
              <dd>
                {d ? (
                  <Link
                    className="hover:underline"
                    href={`/departures/${d.id}`}
                  >
                    {dateShort(d.startDate)}
                  </Link>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Party size</dt>
              <dd>{b.partySize}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Booked</dt>
              <dd>{dateShort(b.createdAt)}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Customer
          </h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Name</dt>
              <dd>
                {c ? (
                  <Link
                    className="hover:underline"
                    href={`/customers/${c.id}`}
                  >
                    {customerName(c)}
                  </Link>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Email</dt>
              <dd>{c?.email ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Phone</dt>
              <dd>{c?.phone ?? "—"}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase text-slate-500">Total</div>
            <div className="text-2xl font-semibold">
              {currency(b.totalPrice)}
            </div>
            <div className="text-sm text-slate-500">
              {currency(b.amountPaid)} collected
            </div>
          </div>
          <div className="flex gap-2">
            <Badge tone={bookingTone(b.status)}>{b.status}</Badge>
            <Badge tone={paymentTone(b.paymentStatus)}>{b.paymentStatus}</Badge>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Booking status
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <form
                  key={s}
                  action={changeBookingStatusAction.bind(null, b.id, s)}
                >
                  <button className={btnGhost} disabled={b.status === s}>
                    {s}
                  </button>
                </form>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payment
            </div>
            <div className="flex flex-wrap gap-2">
              {payments.map((s) => (
                <form
                  key={s}
                  action={changePaymentStatusAction.bind(null, b.id, s)}
                >
                  <button
                    className={btnGhost}
                    disabled={b.paymentStatus === s}
                  >
                    {s}
                  </button>
                </form>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
