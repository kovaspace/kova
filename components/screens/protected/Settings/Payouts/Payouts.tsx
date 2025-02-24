"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, CreditCard, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PayoutsProps {
  accountId: string;
}

export default function Payouts({ accountId }: PayoutsProps) {
  console.log(accountId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payout Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your Stripe payout account and banking details
        </p>
      </div>

      {/* Stripe Account Status */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Stripe Account</h2>
            <p className="text-sm text-muted-foreground">
              Connect your Stripe account to receive payments
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Stripe Account</h3>
                <Badge variant="outline">Not Connected</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect your Stripe account to start receiving payments
              </p>
            </div>
            <Button className="flex items-center gap-2">
              Connect Stripe
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Payout Methods */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Payout Methods</h2>
            <p className="text-sm text-muted-foreground">
              Add and manage your payout methods
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-muted p-2">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">No Payout Methods</h3>
              <p className="text-sm text-muted-foreground">
                Add a bank account or debit card for payouts
              </p>
            </div>
            <Button variant="outline">Add Method</Button>
          </div>
        </div>
      </Card>

      {/* Payout Schedule */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Payout Schedule</h2>
            <p className="text-sm text-muted-foreground">
              Configure when you receive your payouts
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm">
              Payouts are automatically processed on a rolling basis
            </p>
            <p className="text-sm text-muted-foreground">
              Connect a Stripe account to customize your payout schedule
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
