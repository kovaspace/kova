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
import { createCustomer, getCustomers } from "@/helpers/api/customers";
import { CustomerFormData, CustomerSchema } from "@/types/customers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/useToast";

interface AddCustomerDialogProps {
  onClose: () => void;
}

export default function AddCustomerDialog({ onClose }: AddCustomerDialogProps) {
  const { toast } = useToast();

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const { reset, handleSubmit, control } = form;

  const { refetch } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CustomerFormData) =>
      await createCustomer(values),
    onSuccess: (data: any) => {
      toast({
        title: "Success",
        description: `${data.first_name} ${data.last_name} has been created`,
      });
      onClose();
      refetch();
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (values: CustomerFormData) => {
    mutate(values);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            id="bookingForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <DialogHeader>
              <DialogTitle>Add customer</DialogTitle>
              <DialogDescription>
                Create a new customer here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-2">
              <FormField
                control={control}
                name="firstName"
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
                name="lastName"
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
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
