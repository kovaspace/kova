import SpaceList from "@/components/screens/public/SpaceList";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Kova | Book",
  description: "Book your space",
};

export default async function Page() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return <SpaceList accountId={accountId} />;
}
