import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import CreateFacility from "@/components/screens/protected/CreateFacility";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Kova | Create Facility",
  description: "Generated by create next app",
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
          { title: "Create" },
        ]}
      />
      <div className="flex-1 overflow-auto" data-scroll-container>
        <AppContainer>
          <CreateFacility accountId={accountId} />
        </AppContainer>
      </div>
    </div>
  );
}
