import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import { TeamSettings } from "@/components/screens/protected/Settings/TeamSettings";
import { headers } from "next/headers";

export default async function TeamSettingsPage() {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id");

  if (!accountId) {
    throw new Error("No account ID found");
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Settings", href: "/settings" },
          { title: "Team Members" },
        ]}
      />

      <AppContainer>
        <TeamSettings accountId={accountId} />
      </AppContainer>
    </div>
  );
}
