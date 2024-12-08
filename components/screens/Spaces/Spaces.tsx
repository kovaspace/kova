"use client";

import { Button } from "@/components/ui/button";
import { getSpaces } from "@/helpers/api/spaces";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Spaces() {
  const router = useRouter();

  const { data: spaces, isLoading } = useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!spaces) return <div>No spaces found</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Spaces</h1>
        <Button onClick={() => router.push("/spaces/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Space
        </Button>
      </div>

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {spaces.map((space) => (
          <li key={space.id} className="relative">
            <div className="max-w-[512px] group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Image
                alt="image"
                src="https://images.unsplash.com/photo-1731490862684-50c9a4180953?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                width={512}
                height={512}
              />
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">View details for {space.name}</span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {space.name}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {space.facilities?.name}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
