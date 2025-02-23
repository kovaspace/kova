import { supabase } from "@/helpers/supabase";
import { SpaceFormData } from "@/types/spaces";

async function getSpace(id: string) {
  try {
    const spacesWithFacilities = supabase
      .from("spaces")
      .select("*, facilities (*)");

    const { data, error } = await spacesWithFacilities.eq("id", id).single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function getSpaces(accountId: string) {
  try {
    const spacesWithFacilities = supabase
      .from("spaces")
      .select("*, facilities (name, account_id)")
      .eq("facilities.account_id", accountId);

    const { data, error } = await spacesWithFacilities;

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function getSpacesByFacilityId(facility_id: string) {
  try {
    const spacesWithFacilities = supabase
      .from("spaces")
      .select("*")
      .eq("facility_id", facility_id);

    const { data, error } = await spacesWithFacilities;

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function createSpace(body: SpaceFormData) {
  try {
    const { data, error } = await supabase
      .from("spaces")
      .insert(body)
      .select()
      .single();

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

async function editSpace(id: string, body: SpaceFormData) {
  try {
    const { data, error } = await supabase
      .from("spaces")
      .update(body)
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
  createSpace,
  deletSpace,
  getSpace,
  getSpaces,
  editSpace,
  getSpacesByFacilityId,
};
