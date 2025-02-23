import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import noctaLogo from "@/assets/images/nocta_logo.png";

// Dummy data for sports facilities
// ... existing imports ...

const dummySpaces = [
  {
    id: "1",
    name: "Indoor Basketball Court",
    description: "Full-size indoor basketball court with professional flooring",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2669&auto=format&fit=crop",
    capacity: 10,
    amenities: ["Scoreboard", "Locker Rooms", "Water Fountains", "Ball Rental"],
    type: "Basketball",
    dimensions: "94ft × 50ft",
    pricePerHour: 60,
  },
  {
    id: "2",
    name: "Indoor Futsal Court",
    description: "FIFA-regulation futsal court with synthetic turf surface",
    image:
      "https://images.unsplash.com/photo-1577416412292-747c6607f055?q=80&w=2670&auto=format&fit=crop",
    capacity: 12,
    amenities: ["Goals", "Locker Rooms", "Ball Rental", "Night Lighting"],
    type: "Futsal",
    dimensions: "42m × 25m",
    pricePerHour: 55,
  },
  {
    id: "3",
    name: "Volleyball Court",
    description:
      "Professional indoor volleyball court with spring-loaded flooring",
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2670&auto=format&fit=crop",
    capacity: 12,
    amenities: ["Net System", "Locker Rooms", "Ball Rental", "Score Display"],
    type: "Volleyball",
    dimensions: "18m × 9m",
    pricePerHour: 45,
  },
  {
    id: "4",
    name: "Badminton Courts",
    description: "Two professional badminton courts with proper lighting",
    image:
      "https://images.unsplash.com/photo-1613918431703-aa50889e3be7?q=80&w=2670&auto=format&fit=crop",
    capacity: 4,
    amenities: ["Nets", "Changing Rooms", "Racket Rental", "Air Conditioning"],
    type: "Badminton",
    dimensions: "13.4m × 6.1m",
    pricePerHour: 35,
  },
];

export default function BookingList() {
  return (
    <div className="flex flex-col gap-6 px-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
          <div className="relative z-10 flex items-start gap-6">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white shadow-lg">
              <Image
                src={noctaLogo}
                alt="Nocta Logo"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Nocta Sports Center
              </h1>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
                Browse and book our premium sports facilities below.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-dark/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors">
            <div className="p-3 rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-muted-foreground">123 Sports Avenue</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors">
            <div className="p-3 rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Opening Hours</h3>
              <p className="text-sm text-muted-foreground">
                7:00 AM - 10:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors">
            <div className="p-3 rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Contact</h3>
              <p className="text-sm text-muted-foreground">(555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummySpaces.map((space) => (
          <Link
            key={space.id}
            href={`/millenium-courts/${space.id}`}
            className="h-full"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-black/50 text-white backdrop-blur-sm"
                  >
                    {space.type}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-black/50 text-white backdrop-blur-sm"
                  >
                    ${space.pricePerHour}/hr
                  </Badge>
                </div>
              </div>
              <CardHeader className="flex-grow">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{space.name}</CardTitle>
                  <Badge variant="outline">
                    Up to {space.capacity} players
                  </Badge>
                </div>
                <CardDescription>{space.description}</CardDescription>
                <div className="mt-2">
                  <Badge variant="outline" className="mr-2">
                    {space.dimensions}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {space.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
