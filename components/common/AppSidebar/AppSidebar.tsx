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

import sidebarLogo from "@/assets/images/sidebar_logo.png";
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
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Image
                  src={sidebarLogo}
                  alt="Kova Logo"
                  height={16}
                  width={16}
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  <Skeleton className="h-3 w-[170px]" />
                </span>
                <span className="truncate text-xs">
                  <Skeleton className="h-3 w-[100px]" />
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <NavProjects projects={data.projects} />
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[170px]" />
              <Skeleton className="h-4 w-[110px]" />
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
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Image src={sidebarLogo} alt="Kova Logo" height={16} width={16} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Kova</span>
              <span className="truncate text-xs">Enterprise</span>
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
            company_name: accounts?.name ?? "Company name not found",
            avatar: currentAccount?.logo ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
