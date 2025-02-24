"use client";

import { Button } from "@/components/ui/button";
import { getSpaces } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import { Plus, MoreVertical, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/helpers/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

interface SpacesProps {
  accountId: string;
}

const STATUS_STYLES = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  maintenance:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  archived: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
} as const;

export default function Spaces({ accountId }: SpacesProps) {
  const router = useRouter();

  const { data: spaces, isLoading } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpaces(accountId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!spaces) return <div>No spaces found</div>;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Spaces</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and organize your available spaces
          </p>
        </div>
        <Button onClick={() => router.push("/spaces/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Space
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {spaces.map((space) => (
          <Card key={space.id} className="group overflow-hidden">
            <CardContent className="p-0">
              {/* Image Container */}
              <div className="relative aspect-[16/10]">
                <Image
                  alt={space.name}
                  src="https://images.unsplash.com/photo-1731490862684-50c9a4180953?q=80&w=2670&auto=format&fit=crop"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Status Badge */}
                <Badge
                  variant="secondary"
                  className={cn(
                    "absolute top-3 right-3 text-xs font-medium",
                    STATUS_STYLES[space.status as keyof typeof STATUS_STYLES] ||
                      STATUS_STYLES.inactive
                  )}
                >
                  {space.status?.charAt(0).toUpperCase() +
                    space.status?.slice(1) || "Inactive"}
                </Badge>

                {/* Action Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-12 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/spaces/edit/${space.id}`)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Space
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold truncate">{space.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {space.facilities?.name}
                </p>

                {/* Additional Info */}
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>$45</span>
                    <span className="text-xs">/hour</span>
                  </div>
                  <div>•</div>
                  <div>Basketball</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
