"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAccount, getFacilities } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FacilityList({ accountId }: { accountId: string }) {
  const {
    data: account,
    error: accountError,
    isLoading: isAccountLoading,
  } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccount(accountId),
  });

  const {
    data: facilities,
    error: facilitiesError,
    isLoading: isFacilitiesLoading,
  } = useQuery({
    queryKey: ["facilities", accountId],
    queryFn: () => getFacilities(accountId),
  });

  if (isAccountLoading || isFacilitiesLoading) return <div>Loading...</div>;
  if (accountError || facilitiesError) return <div>Error...</div>;
  if (!account || !facilities) return <div>No data</div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <Link
              key={facility.id}
              href={`/millenium-courts/${facility.slug}`}
              className="block group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2669&auto=format&fit=crop"
                    alt={facility.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-xl font-semibold">{facility.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-primary/90 hover:bg-primary text-white">
                        From $45/hr
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-white border-white/50"
                      >
                        Basketball
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {facility.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      94ft × 50ft
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Up to 12 players
                    </Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                    {[
                      "Scoreboard",
                      "Locker Rooms",
                      "Water Fountains",
                      "Ball Rental",
                    ].map((amenity, index) => (
                      <span
                        key={index}
                        className="text-xs text-muted-foreground flex items-center gap-1"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
