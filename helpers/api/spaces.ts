import { supabase } from "@/helpers/supabase";
import { SpaceFormData } from "@/schemas/spaces";

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
      .eq("facilities.account_id", accountId)
      .order("status", { ascending: true });

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
    const { images, ...rest } = body;

    const { data: space, error } = await supabase
      .from("spaces")
      .insert(rest)
      .select()
      .single();

    if (error) throw error;

    console.log("space", space);

    images?.forEach(async (image, index) => {
      const { data, error } = await supabase.storage
        .from("spaces")
        .upload(`${space.id}/${index}`, image, {
          cacheControl: "3600",
          upsert: true,
        });

      console.log("image", data);

      if (error) throw error;
    });

    return space;
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

async function editSpace(id: string, accountId: string, body: SpaceFormData) {
  try {
    const { images, ...rest } = body;

    const uploads = images?.map(async (image, index) => {
      const filePath = `${accountId}/spaces/${id}/${index}`;
      const { error } = await supabase.storage
        .from("app")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) throw error;
      return filePath;
    });

    await Promise.all(uploads ?? []);

    const { data: space, error } = await supabase
      .from("spaces")
      .update(rest)
      .match({ id })
      .select()
      .single();

    if (error) throw error;

    return space;
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
