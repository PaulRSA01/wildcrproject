import type {
  Booking,
  BookingStatus,
  Customer,
  Departure,
  DepartureStatus,
  PaymentStatus,
  Tour,
} from "./types";

export interface DB {
  tours: Tour[];
  departures: Departure[];
  customers: Customer[];
  bookings: Booking[];
  seq: number;
}

const paidFor = (total: number, s: PaymentStatus) =>
  s === "paid" ? total : s === "deposit" ? Math.round(total * 0.2) : 0;

function seed(): DB {
  const tours: Tour[] = [
    {
      id: "t1",
      name: "Patagonia Explorer",
      destination: "El Calafate",
      country: "Argentina",
      category: "Trekking",
      durationDays: 10,
      basePrice: 3200,
      maxCapacity: 14,
      summary:
        "Glaciers, granite spires and the wild trails of Torres del Paine and Los Glaciares.",
      highlights: [
        "Perito Moreno glacier walk",
        "W-trek in Torres del Paine",
        "Fitz Roy day hike",
      ],
    },
    {
      id: "t2",
      name: "Kyoto & Kansai Cultural Journey",
      destination: "Kyoto",
      country: "Japan",
      category: "Cultural",
      durationDays: 8,
      basePrice: 2950,
      maxCapacity: 16,
      summary:
        "Temples, tea houses and food markets across Japan's old imperial heartland.",
      highlights: [
        "Fushimi Inari at dawn",
        "Arashiyama bamboo grove",
        "Nara day trip",
        "Kaiseki dinner",
      ],
    },
    {
      id: "t3",
      name: "Serengeti Migration Safari",
      destination: "Serengeti",
      country: "Tanzania",
      category: "Wildlife",
      durationDays: 7,
      basePrice: 4600,
      maxCapacity: 12,
      summary:
        "Follow the great migration across the plains with expert naturalist guides.",
      highlights: [
        "Ngorongoro Crater game drive",
        "Great migration river crossings",
        "Optional balloon safari",
      ],
    },
    {
      id: "t4",
      name: "Iceland Ring Road Adventure",
      destination: "Reykjavik",
      country: "Iceland",
      category: "Adventure",
      durationDays: 9,
      basePrice: 3800,
      maxCapacity: 13,
      summary:
        "Waterfalls, black-sand beaches, ice caves and hot springs on a full loop of the island.",
      highlights: [
        "Jokulsarlon glacier lagoon",
        "Vatnajokull ice cave",
        "Highlands super-jeep day",
      ],
    },
    {
      id: "t5",
      name: "Amalfi Coast & Naples",
      destination: "Amalfi",
      country: "Italy",
      category: "Beach",
      durationDays: 6,
      basePrice: 2400,
      maxCapacity: 18,
      summary:
        "Cliffside villages, lemon groves and the bay of Naples at an easy pace.",
      highlights: ["Path of the Gods walk", "Pompeii guided tour", "Capri boat day"],
    },
    {
      id: "t6",
      name: "Everest Base Camp Trek",
      destination: "Kathmandu",
      country: "Nepal",
      category: "Trekking",
      durationDays: 14,
      basePrice: 2700,
      maxCapacity: 12,
      summary:
        "The classic high-altitude trek to the foot of the world's highest mountain.",
      highlights: [
        "Namche Bazaar acclimatisation",
        "Kala Patthar sunrise",
        "Tengboche monastery",
      ],
    },
  ];

  const departures: Departure[] = [
    { id: "d1", tourId: "t1", startDate: "2026-10-05", endDate: "2026-10-15", price: 3200, capacity: 14, status: "guaranteed", guideName: "Sofia Herrera" },
    { id: "d2", tourId: "t1", startDate: "2026-11-12", endDate: "2026-11-22", price: 3350, capacity: 14, status: "scheduled", guideName: "Mateo Rios" },
    { id: "d3", tourId: "t2", startDate: "2026-09-28", endDate: "2026-10-06", price: 2950, capacity: 16, status: "guaranteed", guideName: "Kenji Tanaka" },
    { id: "d4", tourId: "t2", startDate: "2026-11-02", endDate: "2026-11-10", price: 3050, capacity: 16, status: "scheduled", guideName: "Aiko Mori" },
    { id: "d5", tourId: "t3", startDate: "2026-10-18", endDate: "2026-10-25", price: 4600, capacity: 12, status: "guaranteed", guideName: "James Kimaro" },
    { id: "d6", tourId: "t3", startDate: "2027-01-20", endDate: "2027-01-27", price: 4750, capacity: 12, status: "scheduled", guideName: "Grace Mollel" },
    { id: "d7", tourId: "t4", startDate: "2026-09-15", endDate: "2026-09-24", price: 3800, capacity: 13, status: "guaranteed", guideName: "Erik Jonsson" },
    { id: "d8", tourId: "t4", startDate: "2026-12-06", endDate: "2026-12-15", price: 3950, capacity: 13, status: "scheduled", guideName: "Anna Sigurdar" },
    { id: "d9", tourId: "t5", startDate: "2026-08-10", endDate: "2026-08-16", price: 2400, capacity: 18, status: "completed", guideName: "Luca Romano" },
    { id: "d10", tourId: "t5", startDate: "2026-10-01", endDate: "2026-10-07", price: 2500, capacity: 18, status: "guaranteed", guideName: "Giulia Costa" },
    { id: "d11", tourId: "t6", startDate: "2026-10-22", endDate: "2026-11-05", price: 2700, capacity: 12, status: "scheduled", guideName: "Pemba Sherpa" },
    { id: "d12", tourId: "t6", startDate: "2026-03-14", endDate: "2026-03-28", price: 2650, capacity: 12, status: "completed", guideName: "Dawa Sherpa" },
  ];

  const customers: Customer[] = [
    { id: "c1", firstName: "Emma", lastName: "Thompson", email: "emma.thompson@example.com", phone: "+44 20 7946 0958", country: "United Kingdom", createdAt: "2026-02-11" },
    { id: "c2", firstName: "Liam", lastName: "O'Connor", email: "liam.oconnor@example.com", phone: "+353 1 437 2200", country: "Ireland", createdAt: "2026-03-02" },
    { id: "c3", firstName: "Olivia", lastName: "Martin", email: "olivia.martin@example.com", phone: "+1 415 555 0132", country: "United States", createdAt: "2026-03-19" },
    { id: "c4", firstName: "Noah", lastName: "Weber", email: "noah.weber@example.com", phone: "+49 30 1234 5678", country: "Germany", createdAt: "2026-04-05" },
    { id: "c5", firstName: "Ava", lastName: "Nguyen", email: "ava.nguyen@example.com", phone: "+61 2 5550 1234", country: "Australia", createdAt: "2026-04-22" },
    { id: "c6", firstName: "Sophia", lastName: "Rossi", email: "sophia.rossi@example.com", phone: "+39 06 5555 1212", country: "Italy", createdAt: "2026-05-08" },
    { id: "c7", firstName: "Lucas", lastName: "Silva", email: "lucas.silva@example.com", phone: "+55 11 95555 4321", country: "Brazil", createdAt: "2026-05-30" },
    { id: "c8", firstName: "Mia", lastName: "Andersen", email: "mia.andersen@example.com", phone: "+45 32 55 12 34", country: "Denmark", createdAt: "2026-06-14" },
    { id: "c9", firstName: "Ethan", lastName: "Park", email: "ethan.park@example.com", phone: "+82 2 555 7788", country: "South Korea", createdAt: "2026-07-01" },
    { id: "c10", firstName: "Charlotte", lastName: "Dubois", email: "charlotte.dubois@example.com", phone: "+33 1 55 55 22 11", country: "France", createdAt: "2026-07-20" },
  ];

  const mk = (
    id: string,
    reference: string,
    customerId: string,
    departureId: string,
    partySize: number,
    status: BookingStatus,
    paymentStatus: PaymentStatus,
    createdAt: string,
  ): Booking => {
    const dep = departures.find((d) => d.id === departureId)!;
    const totalPrice = dep.price * partySize;
    return {
      id,
      reference,
      customerId,
      departureId,
      partySize,
      status,
      paymentStatus,
      totalPrice,
      amountPaid: paidFor(totalPrice, paymentStatus),
      createdAt,
    };
  };

  const bookings: Booking[] = [
    mk("b1", "TO-2026-0001", "c1", "d1", 2, "confirmed", "paid", "2026-06-02"),
    mk("b2", "TO-2026-0002", "c3", "d1", 2, "confirmed", "deposit", "2026-06-18"),
    mk("b3", "TO-2026-0003", "c5", "d1", 1, "pending", "unpaid", "2026-08-25"),
    mk("b4", "TO-2026-0004", "c2", "d3", 2, "confirmed", "paid", "2026-05-11"),
    mk("b5", "TO-2026-0005", "c6", "d3", 3, "confirmed", "deposit", "2026-06-03"),
    mk("b6", "TO-2026-0006", "c4", "d3", 2, "pending", "unpaid", "2026-08-30"),
    mk("b7", "TO-2026-0007", "c7", "d5", 2, "confirmed", "paid", "2026-06-21"),
    mk("b8", "TO-2026-0008", "c9", "d5", 2, "confirmed", "deposit", "2026-07-09"),
    mk("b9", "TO-2026-0009", "c8", "d7", 2, "confirmed", "paid", "2026-05-19"),
    mk("b10", "TO-2026-0010", "c10", "d7", 4, "confirmed", "deposit", "2026-06-28"),
    mk("b11", "TO-2026-0011", "c1", "d10", 2, "confirmed", "paid", "2026-06-30"),
    mk("b12", "TO-2026-0012", "c3", "d10", 2, "pending", "unpaid", "2026-08-12"),
    mk("b13", "TO-2026-0013", "c4", "d11", 1, "confirmed", "deposit", "2026-07-15"),
    mk("b14", "TO-2026-0014", "c5", "d11", 2, "pending", "unpaid", "2026-08-19"),
    mk("b15", "TO-2026-0015", "c6", "d9", 2, "confirmed", "paid", "2026-04-02"),
    mk("b16", "TO-2026-0016", "c2", "d2", 2, "pending", "unpaid", "2026-09-01"),
    mk("b17", "TO-2026-0017", "c7", "d4", 2, "cancelled", "refunded", "2026-07-22"),
  ];

  return { tours, departures, customers, bookings, seq: 100 };
}

const globalRef = globalThis as unknown as { __WCR_DB__?: DB };
export const db: DB = (globalRef.__WCR_DB__ ??= seed());

const iso = () => new Date().toISOString().slice(0, 10);
const byStartDate = (a: { startDate: string }, b: { startDate: string }) =>
  a.startDate.localeCompare(b.startDate);

/* ----------------------------- queries ----------------------------- */

export const listTours = () =>
  [...db.tours].sort((a, b) => a.name.localeCompare(b.name));
export const getTour = (id: string) => db.tours.find((t) => t.id === id);

export const listDepartures = () => [...db.departures].sort(byStartDate);
export const getDeparture = (id: string) =>
  db.departures.find((d) => d.id === id);
export const departuresForTour = (tourId: string) =>
  db.departures.filter((d) => d.tourId === tourId).sort(byStartDate);

export const listCustomers = () =>
  [...db.customers].sort((a, b) => a.lastName.localeCompare(b.lastName));
export const getCustomer = (id: string) =>
  db.customers.find((c) => c.id === id);
export const customerName = (c: Customer) => `${c.firstName} ${c.lastName}`;

export const listBookings = () =>
  [...db.bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
export const getBooking = (id: string) => db.bookings.find((b) => b.id === id);
export const bookingsForDeparture = (id: string) =>
  db.bookings.filter((b) => b.departureId === id);
export const bookingsForCustomer = (id: string) =>
  db.bookings
    .filter((b) => b.customerId === id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const seatsBooked = (departureId: string) =>
  db.bookings
    .filter((b) => b.departureId === departureId && b.status !== "cancelled")
    .reduce((sum, b) => sum + b.partySize, 0);

export const seatsLeft = (d: Departure) => d.capacity - seatsBooked(d.id);

export function metrics() {
  const cutoff = iso();
  const upcoming = db.departures.filter(
    (d) =>
      d.startDate >= cutoff &&
      d.status !== "cancelled" &&
      d.status !== "completed",
  );
  const active = db.bookings.filter((b) => b.status !== "cancelled");
  const capacity = upcoming.reduce((s, d) => s + d.capacity, 0);
  const filled = upcoming.reduce((s, d) => s + seatsBooked(d.id), 0);
  return {
    upcomingDepartures: upcoming.length,
    activeBookings: active.length,
    travelers: active.reduce((s, b) => s + b.partySize, 0),
    revenueBooked: db.bookings
      .filter((b) => b.status === "confirmed")
      .reduce((s, b) => s + b.totalPrice, 0),
    revenueCollected: db.bookings.reduce((s, b) => s + b.amountPaid, 0),
    fillRate: capacity ? filled / capacity : 0,
  };
}

/* ---------------------------- mutations ---------------------------- */

export function addTour(data: Omit<Tour, "id">): Tour {
  const tour: Tour = { ...data, id: `t${++db.seq}` };
  db.tours.push(tour);
  return tour;
}

export function addDeparture(data: Omit<Departure, "id">): Departure {
  const departure: Departure = { ...data, id: `d${++db.seq}` };
  db.departures.push(departure);
  return departure;
}

export function addCustomer(
  data: Omit<Customer, "id" | "createdAt">,
): Customer {
  const customer: Customer = { ...data, id: `c${++db.seq}`, createdAt: iso() };
  db.customers.push(customer);
  return customer;
}

export function addBooking(data: {
  customerId: string;
  departureId: string;
  partySize: number;
}): Booking {
  const dep = getDeparture(data.departureId);
  if (!dep) throw new Error("Unknown departure");
  const totalPrice = dep.price * data.partySize;
  const number = db.bookings.length + 1;
  const booking: Booking = {
    id: `b${++db.seq}`,
    reference: `TO-2026-${String(number).padStart(4, "0")}`,
    customerId: data.customerId,
    departureId: data.departureId,
    partySize: data.partySize,
    status: "pending",
    paymentStatus: "unpaid",
    totalPrice,
    amountPaid: 0,
    createdAt: iso(),
  };
  db.bookings.push(booking);
  return booking;
}

export function setBookingStatus(id: string, status: BookingStatus) {
  const b = getBooking(id);
  if (b) b.status = status;
}

export function setPaymentStatus(id: string, paymentStatus: PaymentStatus) {
  const b = getBooking(id);
  if (!b) return;
  b.paymentStatus = paymentStatus;
  b.amountPaid = paidFor(b.totalPrice, paymentStatus);
}

export function setDepartureStatus(id: string, status: DepartureStatus) {
  const d = getDeparture(id);
  if (d) d.status = status;
}
