"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, CreditCard } from "lucide-react";

interface BillingProps {
  accountId: string;
}

export default function Billing({ accountId }: BillingProps) {
  const plans = [
    {
      name: "Free",
      description: "For small teams just getting started",
      price: "$0",
      features: [
        "Up to 3 team members",
        "Basic analytics",
        "24-hour support response time",
        "5GB storage",
      ],
      current: true,
    },
    {
      name: "Pro",
      description: "For growing teams and organizations",
      price: "$29",
      features: [
        "Unlimited team members",
        "Advanced analytics",
        "4-hour support response time",
        "50GB storage",
        "Custom domains",
      ],
      current: false,
    },
  ];

  console.log(accountId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Subscription */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Current Plan</h2>
            <p className="text-sm text-muted-foreground">
              Your current subscription plan and status
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Free Plan</h3>
                <Badge variant="outline">Current Plan</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Basic features for small teams
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Available Plans */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.name} className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <span className="text-2xl font-bold">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.current ? "outline" : "default"}
                  className="w-full"
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
