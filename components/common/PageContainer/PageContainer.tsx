import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col gap-4 py-4 pt-0">{children}</div>;
}
