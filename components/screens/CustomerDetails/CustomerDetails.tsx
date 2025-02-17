"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getCustomer } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { formatDate } from "@/helpers/utils";

export default function CustomerDetails({ id }: { id: string }) {
  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomer(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;

  // Temporary dummy bookings data - you'll need to add this to your database
  const bookings = [
    {
      id: 1,
      service: "Hair Cut",
      date: "2024-03-15",
      time: "14:00",
      status: "Completed",
      price: "$35.00",
    },
    {
      id: 2,
      service: "Hair Coloring",
      date: "2024-02-28",
      time: "10:30",
      status: "Completed",
      price: "$120.00",
    },
    {
      id: 3,
      service: "Styling",
      date: "2024-03-20",
      time: "16:00",
      status: "Upcoming",
      price: "$55.00",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customer Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">
                {customer.first_name} {customer.last_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{customer.phone_number || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created at</p>
              <p className="font-medium">{formatDate(customer.created_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>
                    {moment(booking.date).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "Completed" ? "default" : "secondary"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
