import { supabase } from "@/helpers/supabase";

async function getAccount(accountId: string) {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export { getAccount };
