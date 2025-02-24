import CustomerBookingCalendar from "@/components/screens/public/CustomerBookingCalendar";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Kova | Book",
  description: "Book your space",
};

export default async function Page() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return <CustomerBookingCalendar accountId={accountId} />;
}
