import Link from "next/link";
import { notFound } from "next/navigation";
import { createDepartureAction } from "@/app/actions";
import {
  Badge,
  Card,
  PageHeader,
  Table,
  Td,
  Th,
  btn,
  departureTone,
  input,
} from "@/components/ui";
import { currency, dateShort } from "@/lib/format";
import { departuresForTour, getTour, seatsBooked } from "@/lib/store";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = getTour(id);
  if (!tour) notFound();
  const deps = departuresForTour(tour.id);

  return (
    <div>
      <PageHeader
        title={tour.name}
        subtitle={`${tour.destination}, ${tour.country} · ${tour.category} · ${tour.durationDays} days`}
        action={
          <Link href="/tours" className="text-sm text-slate-500 hover:underline">
            ← All tours
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <p className="text-sm text-slate-700">{tour.summary}</p>
          <ul className="mt-4 list-inside list-disc text-sm text-slate-600">
            {tour.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Base price</dt>
              <dd className="font-medium">{currency(tour.basePrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Max capacity</dt>
              <dd className="font-medium">{tour.maxCapacity}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Departures</dt>
              <dd className="font-medium">{deps.length}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Departures
      </h2>
      <Table
        head={
          <>
            <Th>Dates</Th>
            <Th>Price</Th>
            <Th>Guide</Th>
            <Th>Seats</Th>
            <Th>Status</Th>
          </>
        }
      >
        {deps.map((d) => (
          <tr key={d.id} className="hover:bg-slate-50">
            <Td>
              <Link
                className="font-medium text-slate-900 hover:underline"
                href={`/departures/${d.id}`}
              >
                {dateShort(d.startDate)} &ndash; {dateShort(d.endDate)}
              </Link>
            </Td>
            <Td>{currency(d.price)}</Td>
            <Td>{d.guideName}</Td>
            <Td>
              {seatsBooked(d.id)}/{d.capacity}
            </Td>
            <Td>
              <Badge tone={departureTone(d.status)}>{d.status}</Badge>
            </Td>
          </tr>
        ))}
      </Table>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          + Schedule a departure
        </summary>
        <Card className="mt-3 p-5">
          <form
            action={createDepartureAction}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <input type="hidden" name="tourId" value={tour.id} />
            <label className="text-sm">
              Start date
              <input name="startDate" type="date" required className={input} />
            </label>
            <label className="text-sm">
              End date
              <input name="endDate" type="date" className={input} />
            </label>
            <label className="text-sm">
              Price (USD)
              <input
                name="price"
                type="number"
                min={0}
                defaultValue={tour.basePrice}
                className={input}
              />
            </label>
            <label className="text-sm">
              Capacity
              <input
                name="capacity"
                type="number"
                min={1}
                defaultValue={tour.maxCapacity}
                className={input}
              />
            </label>
            <label className="text-sm">
              Guide
              <input name="guideName" className={input} />
            </label>
            <label className="text-sm">
              Status
              <select name="status" className={input}>
                <option value="scheduled">scheduled</option>
                <option value="guaranteed">guaranteed</option>
              </select>
            </label>
            <div className="sm:col-span-2">
              <button className={btn}>Add departure</button>
            </div>
          </form>
        </Card>
      </details>
    </div>
  );
}
