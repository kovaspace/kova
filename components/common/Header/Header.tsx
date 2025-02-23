"use client";

import { getAccount, getFacilityBySlug } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import { Clock, MapPin, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import Logo from "@/components/common/Logo/Logo";

interface HeaderProps {
  accountId: string;
}

export default function Header({ accountId }: HeaderProps) {
  const params = useParams();
  const facilitySlug = params["facility-slug"] as string;

  const {
    data: account,
    error: accountError,
    isLoading: isAccountLoading,
  } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccount(accountId),
  });

  const {
    data: facility,
    error: facilityError,
    isLoading: isFacilityLoading,
  } = useQuery({
    queryKey: ["facilities", facilitySlug],
    queryFn: () => getFacilityBySlug(facilitySlug),
    enabled: !!facilitySlug,
  });

  if (isAccountLoading || isFacilityLoading) return <div>Loading...</div>;
  if (accountError || facilityError) return <div>Error...</div>;
  if (!account) return <div>No data</div>;

  return (
    <>
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <div>
              {account.logo ? (
                <Logo
                  src={account.logo}
                  alt={`${account.name} Logo`}
                  width={180}
                  className="mb-2"
                />
              ) : (
                <h1 className="text-4xl font-bold">{account.name}</h1>
              )}
              <p className="text-lg opacity-90 mt-2">
                Find and book your perfect court
              </p>
            </div>
          </div>
        </div>
      </div>

      {facility && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{`${facility.address}, ${facility.city}, ${facility.state_province}, ${facility.country}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>{facility.phone_number}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
