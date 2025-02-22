"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/helpers/utils";
import { addDays, format, isSameDay } from "date-fns";
import { Info, MapPin, Star } from "lucide-react";
import Image from "next/image";
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

export default function CustomerBookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const isTimeSlotAvailable = (time: string) => {
    return !UNAVAILABLE_SLOTS.some(
      (slot) =>
        slot.time === time && selectedDate && isSameDay(slot.date, selectedDate)
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Image Gallery */}
      <div className="relative h-[500px] grid grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
        <div className="col-span-2 row-span-2 relative">
          <Image
            src={SPACE_DETAILS.images[0]}
            alt="Main space image"
            fill
            className="object-cover"
          />
        </div>
        {SPACE_DETAILS.images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Space image ${index + 2}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 bg-white"
          onClick={() => {
            /* Implement image gallery modal */
          }}
        >
          Show all photos
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Space Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="border-b pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {SPACE_DETAILS.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{SPACE_DETAILS.rating}</span>
                    <span>·</span>
                    <span>{SPACE_DETAILS.reviewCount} reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{SPACE_DETAILS.address}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${SPACE_DETAILS.price}</div>
                <div className="text-sm text-muted-foreground">per hour</div>
              </div>
            </div>
          </div>

          <div className="border-b pb-8">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={SPACE_DETAILS.host.image}
                alt={SPACE_DETAILS.host.name}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <h2 className="font-semibold">
                  Hosted by {SPACE_DETAILS.host.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {SPACE_DETAILS.host.responseTime}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">{SPACE_DETAILS.description}</p>
          </div>

          <div className="border-b pb-8">
            <h2 className="text-xl font-semibold mb-4">
              What this space offers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {SPACE_DETAILS.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Info className="h-5 w-5" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Things to know</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Space rules</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Minimum booking: 1 hour</li>
                  <li>• No food or drinks in studio area</li>
                  <li>• Equipment must be handled with care</li>
                  <li>• Clean up after your session</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Cancellation policy</h3>
                <p className="text-sm text-muted-foreground">
                  Full refund up to 24 hours before your booking. After that,
                  the booking amount is non-refundable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Select Date & Time
                    </h2>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Available Times</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className={cn(
                            "w-full",
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

                  {selectedTime && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Date</span>
                          <span className="font-medium">
                            {selectedDate &&
                              format(selectedDate, "MMMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total</span>
                          <span className="font-medium">
                            ${SPACE_DETAILS.price}.00
                          </span>
                        </div>
                      </div>
                      <Button className="w-full" size="lg">
                        Reserve Space
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
