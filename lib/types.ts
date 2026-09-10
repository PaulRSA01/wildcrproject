export type TourCategory =
  | "Adventure"
  | "Cultural"
  | "Wildlife"
  | "Beach"
  | "Trekking";

export interface Tour {
  id: string;
  name: string;
  destination: string;
  country: string;
  category: TourCategory;
  durationDays: number;
  basePrice: number; // per person, USD
  maxCapacity: number; // per departure
  summary: string;
  highlights: string[];
}

export type DepartureStatus =
  | "scheduled"
  | "guaranteed"
  | "full"
  | "completed"
  | "cancelled";

export interface Departure {
  id: string;
  tourId: string;
  startDate: string; // ISO date (YYYY-MM-DD)
  endDate: string;
  price: number; // per person for this departure, USD
  capacity: number;
  status: DepartureStatus;
  guideName: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  createdAt: string; // ISO date
  notes?: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type PaymentStatus = "unpaid" | "deposit" | "paid" | "refunded";

export interface Booking {
  id: string;
  reference: string; // e.g. TO-2026-0007
  customerId: string;
  departureId: string;
  partySize: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  amountPaid: number;
  createdAt: string; // ISO date
  notes?: string;
}
