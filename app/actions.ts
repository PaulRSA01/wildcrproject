"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addBooking,
  addCustomer,
  addDeparture,
  addTour,
  setBookingStatus,
  setDepartureStatus,
  setPaymentStatus,
} from "@/lib/store";
import type {
  BookingStatus,
  DepartureStatus,
  PaymentStatus,
  TourCategory,
} from "@/lib/types";

const str = (v: FormDataEntryValue | null) => String(v ?? "").trim();
const num = (v: FormDataEntryValue | null) => Number(v ?? 0) || 0;

const refresh = () => revalidatePath("/", "layout");

export async function createTourAction(formData: FormData) {
  addTour({
    name: str(formData.get("name")) || "Untitled tour",
    destination: str(formData.get("destination")),
    country: str(formData.get("country")),
    category: (str(formData.get("category")) as TourCategory) || "Adventure",
    durationDays: Math.max(1, num(formData.get("durationDays"))),
    basePrice: Math.max(0, num(formData.get("basePrice"))),
    maxCapacity: Math.max(1, num(formData.get("maxCapacity"))),
    summary: str(formData.get("summary")),
    highlights: str(formData.get("highlights"))
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  });
  refresh();
}

export async function createDepartureAction(formData: FormData) {
  const tourId = str(formData.get("tourId"));
  const startDate = str(formData.get("startDate"));
  addDeparture({
    tourId,
    startDate,
    endDate: str(formData.get("endDate")) || startDate,
    price: Math.max(0, num(formData.get("price"))),
    capacity: Math.max(1, num(formData.get("capacity"))),
    status:
      (str(formData.get("status")) as DepartureStatus) || "scheduled",
    guideName: str(formData.get("guideName")) || "TBD",
  });
  refresh();
  redirect(`/tours/${tourId}`);
}

export async function createCustomerAction(formData: FormData) {
  addCustomer({
    firstName: str(formData.get("firstName")),
    lastName: str(formData.get("lastName")),
    email: str(formData.get("email")),
    phone: str(formData.get("phone")),
    country: str(formData.get("country")),
  });
  refresh();
}

export async function createBookingAction(formData: FormData) {
  const customerId = str(formData.get("customerId"));
  const departureId = str(formData.get("departureId"));
  const partySize = Math.max(1, num(formData.get("partySize")));
  if (!customerId || !departureId) {
    throw new Error("Customer and departure are required");
  }
  const booking = addBooking({ customerId, departureId, partySize });
  refresh();
  redirect(`/bookings/${booking.id}`);
}

export async function changeBookingStatusAction(
  id: string,
  status: BookingStatus,
) {
  setBookingStatus(id, status);
  refresh();
}

export async function changePaymentStatusAction(
  id: string,
  status: PaymentStatus,
) {
  setPaymentStatus(id, status);
  refresh();
}

export async function changeDepartureStatusAction(
  id: string,
  status: DepartureStatus,
) {
  setDepartureStatus(id, status);
  refresh();
}
