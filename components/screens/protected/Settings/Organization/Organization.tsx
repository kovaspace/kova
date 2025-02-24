"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getAccount, updateAccount } from "@/helpers/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountFormData, accountSchema } from "@/types/account";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

interface OrganizationProps {
  accountId: string;
}

export default function Organization({ accountId }: OrganizationProps) {
  const { toast } = useToast();

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      slug: "",
      email: "",
      logo: "",
    },
  });

  const { data: account, refetch } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccount(accountId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: AccountFormData) =>
      await updateAccount(accountId, values),
    onSuccess: () => {
      refetch();
      toast({
        title: "Success",
        description: "Organization settings updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({
        name: account.name,
        slug: account.slug || "",
        email: account.email,
        logo: account.logo || "",
      });
    }
  }, [account, form]);

  const onSubmit = (values: AccountFormData) => {
    mutate(values);
  };

  if (!account) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Organization Settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your organization details and branding
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">Organization Logo</h2>
                  <p className="text-sm text-muted-foreground">
                    Your organization&apos;s logo will be displayed across the
                    platform
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24">
                    <div className="h-24 w-24 rounded-lg border bg-muted flex items-center justify-center">
                      <Image
                        src={account.logo || "/placeholder-logo.png"}
                        alt="Organization logo"
                        className="rounded-lg object-cover"
                        fill
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button>Upload New Logo</Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended: Square PNG or JPG, at least 256x256px
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Organization Details
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Update your organization&apos;s basic information
                  </p>
                </div>

                <div className="grid gap-4 max-w-lg">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter organization name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="organization-name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
