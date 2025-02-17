import supabase from "@/helpers/supabase/client";

async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const usersWithAccounts = supabase.from("users").select("*, accounts (*)");

    const { data, error } = await usersWithAccounts.eq("id", user.id).single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export { getCurrentUser };
