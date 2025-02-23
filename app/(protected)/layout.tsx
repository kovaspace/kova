import AppSidebar from "@/components/common/AppSidebar";
import DialogWrapper from "@/components/dialogs/DialogWrapper";
import { SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const accountId = headersList.get("x-account-id") as string;

  return (
    <>
      <AppSidebar accountId={accountId} />
      <SidebarInset>
        {children}
        <Toaster />
        <DialogWrapper />
      </SidebarInset>
    </>
  );
}
