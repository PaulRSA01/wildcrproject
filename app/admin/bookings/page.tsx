import Link from "next/link";
import {
  Badge,
  PageHeader,
  Table,
  Td,
  Th,
  bookingTone,
  btn,
  paymentTone,
} from "@/components/ui";
import { currency, dateShort } from "@/lib/format";
import {
  customerName,
  getCustomer,
  getDeparture,
  getTour,
  listBookings,
} from "@/lib/store";

const filters = [
  ["all", "All"],
  ["pending", "Pending"],
  ["confirmed", "Confirmed"],
  ["cancelled", "Cancelled"],
] as const;

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "all" } = await searchParams;
  const list = listBookings().filter((b) =>
    status === "all" ? true : b.status === status,
  );

  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle={`${list.length} shown`}
        action={
          <Link href="/admin/bookings/new" className={btn}>
            + New booking
          </Link>
        }
      />

      <div className="mb-4 flex gap-2">
        {filters.map(([key, label]) => (
          <Link
            key={key}
            href={`/admin/bookings?status=${key}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              status === key
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <Table
        head={
          <>
            <Th>Ref</Th>
            <Th>Customer</Th>
            <Th>Tour</Th>
            <Th>Departs</Th>
            <Th>Party</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th>Payment</Th>
          </>
        }
      >
        {list.map((b) => {
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
              <Td>{d ? dateShort(d.startDate) : "—"}</Td>
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
