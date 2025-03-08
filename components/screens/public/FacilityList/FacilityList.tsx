"use client";

import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { Badge } from "@/components/ui/badge";
import { getAccount, getFacilities } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import { Globe, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FacilityList({ accountId }: { accountId: string }) {
  const {
    data: account,
    error: accountError,
    isLoading: isAccountLoading,
    refetch: refetchAccount,
  } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccount(accountId),
  });

  const {
    data: facilities,
    error: facilitiesError,
    isLoading: isFacilitiesLoading,
    refetch: refetchFacilities,
  } = useQuery({
    queryKey: ["facilities", accountId],
    queryFn: () => getFacilities(accountId),
  });

  if (isAccountLoading || isFacilitiesLoading) return <Loading />;
  if (accountError || facilitiesError) {
    return (
      <Error
        title="Failed to load facilities"
        message="We couldn't load the facility information. Please try again."
        retry={() => {
          refetchAccount();
          refetchFacilities();
        }}
      />
    );
  }
  if (!account || !facilities) return <div>No data</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Refined with white background */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            {/* Company Logo */}
            <div className="h-32 w-32 relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={account.logo || ""}
                alt={`${account.name} logo`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold mb-3">{account.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-gray-100">
                      {facilities.length} Facilities
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">5.0</span>
                    <span className="text-gray-400">
                      ({facilities.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-black transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
                <a
                  href="tel:415-555-1234"
                  className="flex items-center gap-2 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <Link
              key={facility.id}
              href={`${account.slug}/${facility.slug}`}
              className="block cursor-pointer"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1504450758481-7338eba7524a"
                    }
                    alt={facility.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{facility.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-black text-sm font-medium">
                        5.0
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {`${facility.address}, ${facility.city}, ${facility.state_province}, ${facility.country}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-green-600">
                      Next available:{" "}
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
