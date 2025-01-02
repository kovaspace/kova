"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking, getBookings } from "@/helpers/api/bookings";
import { getCustomers } from "@/helpers/api/customers";
import { getFacilities } from "@/helpers/api/facilities";
import { getSpacesByFacilityId } from "@/helpers/api/spaces";
import { cn } from "@/lib/utils";
import { BookingFormData, BookingSchema } from "@/types/bookings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useToast } from "@/hooks/useToast";

interface AddBookingDialogProps {
  onClose: () => void;
}

export const availableTimes = [
  { id: 1, start: "09:00 AM", end: "10:00 AM" },
  { id: 2, start: "10:00 AM", end: "11:00 AM" },
  { id: 3, start: "11:00 AM", end: "12:00 PM" },
  { id: 4, start: "12:00 PM", end: "01:00 PM" },
  { id: 5, start: "01:00 PM", end: "02:00 PM" },
  { id: 6, start: "02:00 PM", end: "03:00 PM" },
  { id: 7, start: "03:00 PM", end: "04:00 PM" },
  { id: 8, start: "04:00 PM", end: "05:00 PM" },
];

const AddBookingDialog = ({ onClose }: AddBookingDialogProps) => {
  const { toast } = useToast();
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [customerOpen, setCustomerOpen] = useState<boolean>(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      facility_id: "",
      space_id: "",
      customer_id: "",
      date: new Date(),
      time: {
        start: "",
        end: "",
      },
    },
  });

  const { reset, handleSubmit, control, resetField } = form;

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const { data: facilities } = useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
  });

  const { data: spaces } = useQuery({
    queryKey: ["spacesByFacilityId", selectedFacility],
    queryFn: () => getSpacesByFacilityId(selectedFacility as string),
    enabled: !!selectedFacility,
  });

  const { refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: BookingFormData) => await createBooking(values),
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Booking has been created`,
      });
      onClose();
      refetch();
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (values: BookingFormData) => {
    mutate(values);
  };

  const renderCustomerFormValue = (value: string) => {
    if (!value) return "Select customer";

    const customer = customers?.find((customer) => customer.id === value);

    return customer
      ? `${customer.first_name} ${customer.last_name}`
      : "Customer not found";
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            id="addBookingForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <DialogHeader>
              <DialogTitle>Add booking</DialogTitle>
              <DialogDescription>
                Create a new booking here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-2">
              <FormField
                control={control}
                name="facility_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedFacility(value);
                        resetField("space_id");
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a facility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {facilities?.map((facility) => (
                          <SelectItem key={facility.id} value={facility.id}>
                            {facility.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="space_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      disabled={!selectedFacility}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a space" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {spaces && spaces?.length > 0 ? (
                          spaces.map((space) => (
                            <SelectItem key={space.id} value={space.id}>
                              {space.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="no-spaces-available">
                            No spaces available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Customer</FormLabel>
                    <Popover open={customerOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                            onClick={() => setCustomerOpen(true)}
                          >
                            {renderCustomerFormValue(field.value)}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search customer..." />
                          <CommandEmpty>No customer found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {customers?.map((customer) => (
                                <CommandItem
                                  value={`${customer.first_name} ${customer.last_name}`}
                                  key={customer.id}
                                  onSelect={() => {
                                    field.onChange(customer.id);
                                    setCustomerOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      customer.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {`${customer.first_name} ${customer.last_name}`}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover open={calendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            onClick={() => setCalendarOpen(true)}
                          >
                            {field.value ? (
                              moment(field.value).format("MMMM Do, YYYY")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Available Times</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((time) => (
                          <Button
                            key={time.id}
                            type="button"
                            variant={
                              `${field.value?.start}-${field.value?.end}` ===
                              `${time.start}-${time.end}`
                                ? "default"
                                : "outline"
                            }
                            className="w-full justify-start text-left font-normal"
                            onClick={() =>
                              field.onChange({
                                start: time.start,
                                end: time.end,
                              })
                            }
                          >
                            <span>
                              {time.start} - {time.end}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Create booking
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookingDialog;
