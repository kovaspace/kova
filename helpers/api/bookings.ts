import supabase from "@/helpers/supabase/client";
import { BookingFormData } from "@/types/bookings";
import moment from "moment";

async function getBooking(id: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function getBookings() {
  try {
    const bookings = supabase
      .from("bookings")
      .select("*, spaces (*, facilities (*)), customers (*)");
    const { data, error } = await bookings;

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function createBooking(body: BookingFormData) {
  try {
    const booking = {
      space_id: body.space_id,
      customer_id: body.customer_id,
      date: moment(body.date).format("YYYY-MM-DD"),
      start_time: body.time.start,
      end_time: body.time.end,
    };

    const { data, error } = await supabase
      .from("bookings")
      .insert(booking)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteBooking(id: number) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .delete()
      .match({ id })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

// async function editBooking(id: string, body: BookingFormData) {
//   try {
//     const { data, error } = await supabase
//       .from("bookings")
//       .update(body)
//       .match({ id })
//       .select()
//       .single();

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export {
  getBooking,
  getBookings,
  createBooking,
  deleteBooking,
  // editBooking,
};
