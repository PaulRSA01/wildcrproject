import Link from "next/link";
import { createTourAction } from "@/app/actions";
import { Card, PageHeader, Table, Td, Th, btn, input } from "@/components/ui";
import { currency, dateShort, today } from "@/lib/format";
import { departuresForTour, listTours } from "@/lib/store";

const categories = ["Adventure", "Cultural", "Wildlife", "Beach", "Trekking"];

export default function ToursPage() {
  const tours = listTours();
  const cutoff = today();

  return (
    <div>
      <PageHeader
        title="Tours"
        subtitle={`${tours.length} products in the catalogue`}
      />

      <Table
        head={
          <>
            <Th>Name</Th>
            <Th>Destination</Th>
            <Th>Category</Th>
            <Th>Duration</Th>
            <Th>From</Th>
            <Th>Departures</Th>
            <Th>Next</Th>
          </>
        }
      >
        {tours.map((t) => {
          const deps = departuresForTour(t.id);
          const next = deps.find((d) => d.startDate >= cutoff);
          return (
            <tr key={t.id} className="hover:bg-slate-50">
              <Td>
                <Link
                  className="font-medium text-slate-900 hover:underline"
                  href={`/tours/${t.id}`}
                >
                  {t.name}
                </Link>
              </Td>
              <Td>
                {t.destination}, {t.country}
              </Td>
              <Td>{t.category}</Td>
              <Td>{t.durationDays} days</Td>
              <Td>{currency(t.basePrice)}</Td>
              <Td>{deps.length}</Td>
              <Td>{next ? dateShort(next.startDate) : "—"}</Td>
            </tr>
          );
        })}
      </Table>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          + Add a tour
        </summary>
        <Card className="mt-3 p-5">
          <form
            action={createTourAction}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <label className="text-sm">
              Name
              <input name="name" required className={input} />
            </label>
            <label className="text-sm">
              Category
              <select name="category" className={input}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Destination
              <input name="destination" className={input} />
            </label>
            <label className="text-sm">
              Country
              <input name="country" className={input} />
            </label>
            <label className="text-sm">
              Duration (days)
              <input
                name="durationDays"
                type="number"
                min={1}
                defaultValue={7}
                className={input}
              />
            </label>
            <label className="text-sm">
              Base price (USD)
              <input
                name="basePrice"
                type="number"
                min={0}
                defaultValue={2000}
                className={input}
              />
            </label>
            <label className="text-sm">
              Max capacity
              <input
                name="maxCapacity"
                type="number"
                min={1}
                defaultValue={12}
                className={input}
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Summary
              <input name="summary" className={input} />
            </label>
            <label className="text-sm sm:col-span-2">
              Highlights (comma-separated)
              <input name="highlights" className={input} />
            </label>
            <div className="sm:col-span-2">
              <button className={btn}>Create tour</button>
            </div>
          </form>
        </Card>
      </details>
    </div>
  );
}
