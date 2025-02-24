import FacilityList from "@/components/screens/public/FacilityList";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Kova | Book Sports Facilities",
  description: "Book your sports facility",
};

export default async function Page() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return <FacilityList accountId={accountId} />;
}
