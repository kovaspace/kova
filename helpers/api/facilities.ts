import { supabase } from "@/helpers/supabase";
import { FacilityFormData } from "@/types/facilities";

async function getFacility(id: string) {
  try {
    const { data, error } = await supabase
      .from("facilities")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function getFacilities() {
  try {
    const { data, error } = await supabase
      .from("facilities")
      .select("*, spaces (*)")
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function createFacility(body: FacilityFormData) {
  try {
    delete body.images;

    const { data, error } = await supabase
      .from("facilities")
      .insert([
        {
          ...body,
          country: body.country[0],
          state_province: body.country[1] ?? "",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function deletFacility(id: string) {
  try {
    const { data, error } = await supabase
      .from("facilities")
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

async function editFacility(id: string, body: FacilityFormData) {
  try {
    delete body.images;

    const { data, error } = await supabase
      .from("facilities")
      .update({
        ...body,
        country: body.country[0],
        state_province: body.country[1] ?? "",
      })
      .match({ id })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export {
  createFacility,
  deletFacility,
  getFacility,
  getFacilities,
  editFacility,
};
