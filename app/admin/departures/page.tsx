import Link from "next/link";
import {
  Badge,
  PageHeader,
  Table,
  Td,
  Th,
  departureTone,
} from "@/components/ui";
import { currency, dateShort, today } from "@/lib/format";
import { getTour, listDepartures, seatsBooked } from "@/lib/store";

const tabs = [
  ["upcoming", "Upcoming"],
  ["past", "Past"],
  ["all", "All"],
] as const;

export default async function DeparturesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter = "upcoming" } = await searchParams;
  const cutoff = today();
  const list = listDepartures().filter((d) =>
    filter === "all"
      ? true
      : filter === "past"
        ? d.startDate < cutoff
        : d.startDate >= cutoff,
  );

  return (
    <div>
      <PageHeader
        title="Departures"
        subtitle="Scheduled trips and their manifests"
      />

      <div className="mb-4 flex gap-2">
        {tabs.map(([key, label]) => (
          <Link
            key={key}
            href={`/admin/departures?filter=${key}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              filter === key
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
            <Th>Tour</Th>
            <Th>Dates</Th>
            <Th>Guide</Th>
            <Th>Seats</Th>
            <Th>Price</Th>
            <Th>Status</Th>
          </>
        }
      >
        {list.map((d) => {
          const tour = getTour(d.tourId);
          const booked = seatsBooked(d.id);
          const over = booked > d.capacity;
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
              <Td className={over ? "font-medium text-rose-600" : ""}>
                {booked}/{d.capacity}
              </Td>
              <Td>{currency(d.price)}</Td>
              <Td>
                <Badge tone={departureTone(d.status)}>{d.status}</Badge>
              </Td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
