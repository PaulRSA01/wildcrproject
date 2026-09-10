import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Badge,
  Card,
  PageHeader,
  Table,
  Td,
  Th,
  bookingTone,
  paymentTone,
} from "@/components/ui";
import { currency, dateShort } from "@/lib/format";
import {
  bookingsForCustomer,
  customerName,
  getCustomer,
  getDeparture,
  getTour,
} from "@/lib/store";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getCustomer(id);
  if (!c) notFound();
  const bs = bookingsForCustomer(c.id);

  return (
    <div>
      <PageHeader
        title={customerName(c)}
        subtitle={c.country}
        action={
          <Link
            href="/customers"
            className="text-sm text-slate-500 hover:underline"
          >
            ← All customers
          </Link>
        }
      />

      <Card className="p-5">
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd>{c.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone</dt>
            <dd>{c.phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Customer since</dt>
            <dd>{dateShort(c.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Bookings</dt>
            <dd>{bs.length}</dd>
          </div>
        </dl>
      </Card>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Bookings
      </h2>
      <Table
        head={
          <>
            <Th>Ref</Th>
            <Th>Tour</Th>
            <Th>Dates</Th>
            <Th>Party</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th>Payment</Th>
          </>
        }
      >
        {bs.map((b) => {
          const d = getDeparture(b.departureId);
          const tour = d ? getTour(d.tourId) : undefined;
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
              <Td>{tour?.name ?? "—"}</Td>
              <Td>
                {d
                  ? `${dateShort(d.startDate)} – ${dateShort(d.endDate)}`
                  : "—"}
              </Td>
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
