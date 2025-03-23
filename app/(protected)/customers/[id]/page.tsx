import AppContainer from "@/components/common/AppContainer";
import Header from "@/components/common/Header";
import CustomerDetails from "@/components/screens/protected/CustomerDetails/CustomerDetails";

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <Header
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Customers", href: "/customers" },
          { title: "Details" },
        ]}
      />
      <div className="flex-1 overflow-auto" data-scroll-container>
        <AppContainer>
          <CustomerDetails />
        </AppContainer>
      </div>
    </div>
  );
}
