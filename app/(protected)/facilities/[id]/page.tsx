import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import EditFacility from "@/components/screens/protected/EditFacility";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Kova | Edit Facility",
  description: "Edit Facility",
};

export default async function Page() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Facilities", href: "/facilities" },
          { title: "Edit" },
        ]}
      />

      <AppContainer>
        <EditFacility accountId={accountId} />
      </AppContainer>
    </div>
  );
}
