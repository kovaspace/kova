import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import Organization from "@/components/screens/protected/Settings/Organization/Organization";
import { headers } from "next/headers";

export default async function OrganizationPage() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Settings", href: "/settings" },
          { title: "Organization" },
        ]}
      />

      <AppContainer>
        <Organization accountId={accountId} />
      </AppContainer>
    </div>
  );
}
