"use client";

import { Card } from "@/components/ui/card";
import {
  Building2,
  ChevronRight,
  CreditCard,
  Key,
  Shield,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SettingsProps {
  accountId: string;
}

const SETTINGS_SECTIONS = [
  {
    title: "Account",
    description: "Manage your account settings and preferences",
    items: [
      {
        icon: Building2,
        name: "Organization",
        description: "Manage your organization details and branding",
        href: "/settings/organization",
      },
      {
        icon: Users,
        name: "Team Members",
        description: "Manage users and their access permissions",
        href: "/settings/users",
      },
    ],
  },
  {
    title: "Billing",
    description: "Manage your billing information and subscription",
    items: [
      {
        icon: CreditCard,
        name: "Billing & Plans",
        description: "Manage your subscription and payment methods",
        href: "/settings/billing",
      },
      {
        icon: Wallet,
        name: "Payout Settings",
        description: "Manage your Stripe payout account and banking details",
        href: "/settings/payouts",
      },
    ],
  },
  {
    title: "Security",
    description: "Manage security settings and authentication",
    items: [
      {
        icon: Shield,
        name: "Security Settings",
        description: "Configure security preferences and 2FA",
        href: "/settings/security",
      },
      {
        icon: Key,
        name: "API Keys",
        description: "Manage API keys and access tokens",
        href: "/settings/api-keys",
      },
    ],
  },
];

export default function Settings({ accountId }: SettingsProps) {
  const router = useRouter();

  console.log(accountId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {SETTINGS_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {section.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.name}
                    className="relative group cursor-pointer hover:shadow-md transition-all"
                    onClick={() => router.push(item.href)}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium leading-none">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
