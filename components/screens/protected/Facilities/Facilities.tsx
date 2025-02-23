"use client";

import { Button } from "@/components/ui/button";
import { getFacilities } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FacilitiesProps {
  accountId: string;
}

export default function Facilities({ accountId }: FacilitiesProps) {
  const router = useRouter();

  const { data: facilities, isLoading } = useQuery({
    queryKey: ["facilities"],
    queryFn: () => getFacilities(accountId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!facilities) return <p>No facilities found</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Facilities</h1>
        <Button onClick={() => router.push("/facilities/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Facility
        </Button>
      </div>

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {facilities.map((facility: any) => (
          <li key={facility.id} className="relative">
            <div className="group max-w-[512px] overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Image
                alt="image"
                src="https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                width={512}
                height={512}
              />
              <button
                type="button"
                onClick={() => router.push(`/facilities/edit/${facility.id}`)}
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">
                  View details for {facility.name}
                </span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {facility.name}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {facility.address}, {facility.city}, {facility.state_province},{" "}
              {facility.country}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
