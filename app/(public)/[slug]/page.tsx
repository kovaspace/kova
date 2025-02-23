import PageContainer from "@/components/common/PageContainer";
import { Metadata } from "next";
import BookingList from "@/components/screens/BookingList";

export const metadata: Metadata = {
  title: "Kova | Book Sports Facilities",
  description: "Book your sports facility",
};

export default function Page() {
  return (
    <PageContainer>
      <BookingList />
    </PageContainer>
  );
}
