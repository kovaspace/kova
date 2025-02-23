import { ReactNode } from "react";

export default function AppContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-4 py-4 px-6 pt-0">{children}</div>
  );
}
