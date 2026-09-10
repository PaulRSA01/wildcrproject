import Link from "next/link";
import { createCustomerAction } from "@/app/actions";
import { Card, PageHeader, Table, Td, Th, btn, input } from "@/components/ui";
import { currency } from "@/lib/format";
import { bookingsForCustomer, customerName, listCustomers } from "@/lib/store";

export default function CustomersPage() {
  const customers = listCustomers();

  return (
    <div>
      <PageHeader title="Customers" subtitle={`${customers.length} contacts`} />

      <Table
        head={
          <>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Country</Th>
            <Th>Bookings</Th>
            <Th>Paid to date</Th>
          </>
        }
      >
        {customers.map((c) => {
          const bs = bookingsForCustomer(c.id);
          const paid = bs.reduce((s, b) => s + b.amountPaid, 0);
          return (
            <tr key={c.id} className="hover:bg-slate-50">
              <Td>
                <Link
                  className="font-medium text-slate-900 hover:underline"
                  href={`/customers/${c.id}`}
                >
                  {customerName(c)}
                </Link>
              </Td>
              <Td>{c.email}</Td>
              <Td>{c.phone}</Td>
              <Td>{c.country}</Td>
              <Td>{bs.length}</Td>
              <Td>{currency(paid)}</Td>
            </tr>
          );
        })}
      </Table>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          + Add a customer
        </summary>
        <Card className="mt-3 p-5">
          <form
            action={createCustomerAction}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <label className="text-sm">
              First name
              <input name="firstName" required className={input} />
            </label>
            <label className="text-sm">
              Last name
              <input name="lastName" required className={input} />
            </label>
            <label className="text-sm">
              Email
              <input name="email" type="email" className={input} />
            </label>
            <label className="text-sm">
              Phone
              <input name="phone" className={input} />
            </label>
            <label className="text-sm sm:col-span-2">
              Country
              <input name="country" className={input} />
            </label>
            <div className="sm:col-span-2">
              <button className={btn}>Add customer</button>
            </div>
          </form>
        </Card>
      </details>
    </div>
  );
}
