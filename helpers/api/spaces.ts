import supabase from "@/lib/supabase/client";
// import { SpaceFormData } from "@/types/spaces";

async function getSpace(id: string) {
  try {
    const spacesWithFacilities = supabase
      .from("spaces")
      .select("*, facilities (name)");

    const { data, error } = await spacesWithFacilities.eq("id", id).single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

// async function createSpace(body: SpaceFormData) {
//   try {
//     const { firstName, lastName, email } = body;
//     const { data, error } = await supabase
//       .from("spaces")
//       .insert([{ first_name: firstName, last_name: lastName, email }])
//       .select()
//       .single();

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

async function getSpaces() {
  try {
    const spacesWithFacilities = supabase
      .from("spaces")
      .select("*, facilities (name)");

    const { data, error } = await spacesWithFacilities;

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function deletSpace(id: string) {
  try {
    const { data, error } = await supabase
      .from("spaces")
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

// async function editSpace(id: string, body: SpaceFormData) {
//   try {
//     const { firstName, lastName, email } = body;
//     const { data, error } = await supabase
//       .from("spaces")
//       .update({ first_name: firstName, last_name: lastName, email })
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
  // createSpace,
  deletSpace,
  getSpace,
  getSpaces,
  // editSpace,
};
