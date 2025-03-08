"use client";

import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import { Badge } from "@/components/ui/badge";
import { getAccount, getFacilityBySlug } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpaceList({ accountId }: { accountId: string }) {
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
  });

  if (isAccountLoading || isFacilityLoading) return <Loading />;
  if (accountError || facilityError) return <Error />;
  if (!account || !facility) return <div>No data</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            {/* Facility Image */}
            <div className="h-32 w-32 relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={account.logo || ""}
                alt={facility.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold mb-3">{facility.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-gray-100">
                      {facility.spaces.length} Spaces
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {facility.address || "No address available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facility.spaces.map((space) => (
            <Link
              key={space.id}
              href={`/${account.slug}/${facility.slug}/${space.id}`}
              className="block cursor-pointer"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1504450758481-7338eba7524a"
                    alt={space.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{space.name}</h3>
                    <Badge variant="secondary" className="bg-gray-100">
                      From $45/hr
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      94ft × 50ft
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Up to 12 players
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Basketball
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-green-600">
                      Next available:{" "}
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                    <Button>Book now</Button>
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
