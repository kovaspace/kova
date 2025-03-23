import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import Settings from "@/components/screens/protected/Settings";
import { headers } from "next/headers";

export default async function page() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Settings" },
        ]}
      />

      <AppContainer>
        <Settings accountId={accountId} />
      </AppContainer>
    </div>
  );
}
