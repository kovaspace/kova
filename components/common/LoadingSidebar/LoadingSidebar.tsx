"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton size="lg">
            <div className="flex items-center gap-3 w-full">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-3 w-[40%]" />
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="space-y-6">
        {/* Navigation Items Loading State */}
        <div className="space-y-2 px-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* Spaces Loading State */}
        <div className="space-y-2">
          <div className="px-4">
            <Skeleton className="h-4 w-16" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 p-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
