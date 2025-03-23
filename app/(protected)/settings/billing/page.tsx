import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import { Billing } from "@/components/screens/protected/Settings/Billing";
import { headers } from "next/headers";

export default async function BillingPage() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Settings", href: "/settings" },
          { title: "Billing & Plans" },
        ]}
      />
      <div className="flex-1 overflow-auto" data-scroll-container>
        <AppContainer>
          <Billing accountId={accountId} />
        </AppContainer>
      </div>
    </div>
  );
}
