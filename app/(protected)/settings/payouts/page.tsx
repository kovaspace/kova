import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import { Payouts } from "@/components/screens/protected/Settings/Payouts";
import { headers } from "next/headers";

export default async function PayoutsPage() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Settings", href: "/settings" },
          { title: "Payouts" },
        ]}
      />

      <AppContainer>
        <Payouts accountId={accountId} />
      </AppContainer>
    </div>
  );
}
