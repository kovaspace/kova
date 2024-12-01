import AppSidebar from "@/components/common/AppSidebar";
import DialogWrapper from "@/components/dialogs/DialogWrapper";
import { SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        {children}
        <Toaster />
        <DialogWrapper />
      </SidebarInset>
    </>
  );
}
