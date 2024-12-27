import supabase from "@/lib/supabase/client";

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

// async function createBooking(body: BookingFormData) {
//   try {
//     const { data, error } = await supabase
//       .from("bookings")
//       .insert([body])
//       .select()
//       .single();

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// async function deletBooking(id: string) {
//   try {
//     const { data, error } = await supabase
//       .from("bookings")
//       .delete()
//       .match({ id })
//       .select()
//       .single();

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

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
  // createBooking,
  // deletBooking,
  // editBooking,
};
