import PageContainer from "@/components/common/PageContainer";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return <PageContainer>{children}</PageContainer>;
}
