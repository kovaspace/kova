"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Box,
  CalendarDays,
  Command,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  Warehouse,
} from "lucide-react";
import * as React from "react";

import NavProjects from "@/components/common/NavProjects";
import NavUser from "@/components/common/NavUser";
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
import { getAccount, getCurrentUser } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      isActive: true,
      icon: PieChart,
    },
    {
      name: "Bookings",
      url: "/bookings",
      icon: CalendarDays,
    },
    {
      name: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      name: "Facilities",
      url: "/facilities",
      icon: Warehouse,
    },
    {
      name: "Spaces",
      url: "/spaces",
      icon: Box,
    },
  ],
};

export default function AppSidebar({
  accountId,
  ...props
}: React.ComponentProps<typeof Sidebar> & { accountId: string }) {
  const router = useRouter();

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: currentAccount, isLoading: isAccountLoading } = useQuery({
    queryKey: ["currentAccount"],
    queryFn: () => getAccount(accountId),
  });

  if (isLoading || !currentUser || isAccountLoading || !currentAccount) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-[18px] w-16" />
              </div>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <NavProjects projects={data.projects} />
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="grid gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  const { first_name, last_name, accounts } = currentUser;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            size="lg"
            onClick={() => router.push("/dashboard")}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
              <Image
                src={currentAccount?.logo || ""}
                alt="Kova Logo"
                className="h-8 w-8 rounded-lg object-cover"
                width={32}
                height={32}
              />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{accounts?.name}</span>
              <span className="truncate text-xs capitalize">TODO: plan</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            first_name,
            last_name,
            email: accounts?.email ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
