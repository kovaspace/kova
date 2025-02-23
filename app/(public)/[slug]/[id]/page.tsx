import PageContainer from "@/components/common/PageContainer";
import CustomerBookingCalendar from "@/components/screens/CustomerBookingCalendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kova | Book",
  description: "Book your space",
};

export default function Page() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6 px-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book a Space</h1>
          <p className="text-muted-foreground">
            Select a date and time to book your space.
          </p>
        </div>
        <CustomerBookingCalendar />
      </div>
    </PageContainer>
  );
}
