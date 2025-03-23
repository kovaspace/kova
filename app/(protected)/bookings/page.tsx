import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import Bookings from "@/components/screens/public/Bookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kova | Bookings",
  description: "Bookings",
};

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Bookings" },
        ]}
      />
      <div className="flex-1 overflow-auto" data-scroll-container>
        <AppContainer>
          <Bookings />
        </AppContainer>
      </div>
    </div>
  );
}
