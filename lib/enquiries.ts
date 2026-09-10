/**
 * In-memory enquiry log. Same pattern as `lib/store.ts` — a module singleton kept
 * on `globalThis` so it survives hot reload in dev. Resets on server restart.
 */

export interface Enquiry {
  id: string;
  tourSlug?: string;
  tourTitle?: string;
  name: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  guests: number;
  message?: string;
  createdAt: string; // ISO timestamp
}

interface EnquiryDB {
  items: Enquiry[];
  seq: number;
}

const globalRef = globalThis as unknown as { __PVT_ENQUIRIES__?: EnquiryDB };
const dbStore: EnquiryDB = (globalRef.__PVT_ENQUIRIES__ ??= { items: [], seq: 0 });

export function addEnquiry(data: Omit<Enquiry, "id" | "createdAt">): Enquiry {
  const enquiry: Enquiry = {
    ...data,
    id: `e${++dbStore.seq}`,
    createdAt: new Date().toISOString(),
  };
  dbStore.items.push(enquiry);
  return enquiry;
}

export const listEnquiries = (): Enquiry[] =>
  [...dbStore.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
