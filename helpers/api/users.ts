import { supabase } from "@/helpers/supabase";

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

async function getTeamMembers(accountId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("account_id", accountId)
      .neq("status", "invited");

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function getPendingInvites(accountId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("account_id", accountId)
      .eq("status", "invited");

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function inviteUserByEmail(email: string, role: string) {
  try {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export { getCurrentUser, getTeamMembers, getPendingInvites, inviteUserByEmail };
