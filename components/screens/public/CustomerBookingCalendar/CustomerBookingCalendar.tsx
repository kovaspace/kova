"use client";

import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { getAccount, getSpace } from "@/helpers/api";
import { cn } from "@/helpers/utils";
import { useQuery } from "@tanstack/react-query";
import { addDays, format, isSameDay } from "date-fns";
import { Clock, MapPin, Star, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

// Dummy data for the space
const SPACE_DETAILS = {
  name: "Creative Studio Space",
  description:
    "A modern, fully-equipped creative studio perfect for photography, video production, and creative projects.",
  address: "123 Creative Lane, Design District, City, 12345",
  hours: "Monday - Sunday: 9:00 AM - 6:00 PM",
  price: 50,
  rating: 4.9,
  reviewCount: 128,
  images: [
    "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  amenities: [
    "Professional Lighting",
    "Sound Equipment",
    "Green Screen",
    "Makeup Room",
    "Free WiFi",
    "Air Conditioning",
  ],
  host: {
    name: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    responseTime: "Usually responds within 1 hour",
  },
};

// Dummy data for time slots
const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

// Dummy data for unavailable slots
const UNAVAILABLE_SLOTS = [
  { date: addDays(new Date(), 1), time: "10:00 AM" },
  { date: addDays(new Date(), 1), time: "11:00 AM" },
  { date: addDays(new Date(), 2), time: "2:00 PM" },
  { date: addDays(new Date(), 2), time: "3:00 PM" },
];

interface CustomerBookingCalendarProps {
  accountId: string;
}

export default function CustomerBookingCalendar({
  accountId,
}: CustomerBookingCalendarProps) {
  const params = useParams();
  const spaceId = params["space-id"] as string;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const {
    data: account,
    error: accountError,
    isLoading: isAccountLoading,
  } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccount(accountId),
  });

  const {
    data: space,
    error: spaceError,
    isLoading: isSpaceLoading,
  } = useQuery({
    queryKey: ["space", spaceId],
    queryFn: () => getSpace(spaceId),
  });

  if (isSpaceLoading) return <Loading />;
  if (spaceError) return <Error />;
  if (!space || !space.facilities) return <div>No data</div>;

  const isTimeSlotAvailable = (time: string) => {
    return !UNAVAILABLE_SLOTS.some(
      (slot) =>
        slot.time === time && selectedDate && isSameDay(slot.date, selectedDate)
    );
  };

  if (isAccountLoading) return <Loading />;
  if (accountError) return <Error />;
  if (!account) return <div>No data</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mobile Friendly */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
            {/* Space Logo/Image */}
            <div className="h-24 w-24 sm:h-32 sm:w-32 relative rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
              <Image
                src={account.logo || ""}
                alt={space.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-2 sm:space-y-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
                  {space.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{SPACE_DETAILS.rating}</span>
                    <span className="text-gray-400">
                      ({SPACE_DETAILS.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {space.facilities.address}, {space.facilities.city},
                      {space.facilities.state_province},
                      {space.facilities.country}
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100">
                    ${space.hourly_rate}/hr
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Friendly */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column: Space Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-8">
            {/* Space Image Gallery */}
            <div className="aspect-video relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={SPACE_DETAILS.images[0]}
                alt={space.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Space Information */}
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    About this space
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {space.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3">Space Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm sm:text-base">
                        Up to 12 players
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm sm:text-base">
                        {SPACE_DETAILS.hours}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {SPACE_DETAILS.amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-xs sm:text-sm"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Image
                    src={SPACE_DETAILS.host.image}
                    alt={SPACE_DETAILS.host.name}
                    width={40}
                    height={40}
                    className="rounded-full sm:w-12 sm:h-12"
                  />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      Hosted by {SPACE_DETAILS.host.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {SPACE_DETAILS.host.responseTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar and Booking Section */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Select Date & Time
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-center w-full">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="w-full rounded-md border"
                      classNames={{
                        months: "w-full",
                        month: "w-full",
                        table: "w-full",
                        head_cell: "w-full",
                        cell: "w-full h-9 text-center p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "w-full h-9 p-0 font-normal aria-selected:opacity-100",
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 sm:mb-3">
                      Available Times
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className={cn(
                            "w-full text-sm sm:text-base",
                            !isTimeSlotAvailable(time) && "opacity-50"
                          )}
                          disabled={!isTimeSlotAvailable(time)}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rules and Policies */}
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3">Space Rules</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <li>• Minimum booking: 1 hour</li>
                    <li>• No food or drinks in studio area</li>
                    <li>• Equipment must be handled with care</li>
                    <li>• Clean up after your session</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3">
                    Cancellation Policy
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Full refund up to 24 hours before your booking. After that,
                    the booking amount is non-refundable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Booking Summary - Sticky on desktop, fixed on mobile */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    Booking Summary
                  </h2>
                  {selectedTime && selectedDate ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Date</span>
                          <span className="font-medium">
                            {format(selectedDate, "MMMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Time</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold">
                            ${SPACE_DETAILS.price}.00
                          </span>
                        </div>
                      </div>
                      <Button className="w-full" size="lg">
                        Reserve Space
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-600 text-center">
                      Please select a date and time to see booking details
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
