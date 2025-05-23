"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editCustomer, getCustomer, getCustomers } from "@/helpers/api";
import { useToast } from "@/hooks/useToast";
import { CustomerFormData, CustomerSchema } from "@/schemas/customers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCustomerDialogProps {
  onClose: () => void;
  customerId: string;
}

export default function EditCustomerDialog({
  onClose,
  customerId,
}: AddCustomerDialogProps) {
  const { toast } = useToast();

  const { data: customer, refetch: refetchCustomer } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: async () => await getCustomer(customerId),
    enabled: !!customerId,
  });

  const { refetch: refetchCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CustomerFormData) =>
      await editCustomer(customerId, values),
    onSuccess: (data: {
      first_name: string;
      last_name: string;
      email: string;
    }) => {
      toast({
        title: "Success",
        description: `${data.first_name} ${data.last_name} has been edited`,
      });
      refetchCustomer();
      refetchCustomers();
      onClose();
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  const { reset, handleSubmit, control } = form;

  useEffect(() => {
    if (customer) {
      reset({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone_number: customer.phone_number || "",
      });
    }
  }, [customer, reset]);

  const onSubmit = (values: CustomerFormData) => {
    mutate(values);
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            id="bookingForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <DialogHeader>
              <DialogTitle>Edit customer</DialogTitle>
              <DialogDescription>
                Edit a customer here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-2">
              <FormField
                control={control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Doe"
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="acme@example.com"
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="+1 (555) 123-4567"
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Edit user
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
