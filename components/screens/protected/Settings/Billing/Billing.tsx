"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSubscriptionPlans } from "@/config/subscriptions";
import { createCheckoutSession } from "@/helpers/stripe/checkout";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

interface BillingProps {
  accountId: string;
}

export default function Billing({ accountId }: BillingProps) {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      router.push(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const { data: subscriptionPlans, isLoading } = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: getSubscriptionPlans,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!subscriptionPlans) {
    return <div>No subscription plans found</div>;
  }

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
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className="p-6">
              <div className="flex h-full flex-col">
                <div className="space-y-4 flex-1">
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
                </div>

                <Button
                  variant={plan.current ? "outline" : "default"}
                  className="w-full mt-4"
                  disabled={plan.current || (isPending && !plan.current)}
                  onClick={
                    !plan.current
                      ? () => mutate({ accountId, priceId: plan.id })
                      : undefined
                  }
                >
                  {plan.current
                    ? "Current Plan"
                    : isPending
                    ? "Loading..."
                    : "Upgrade"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
