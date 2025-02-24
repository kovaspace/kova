import { supabase } from "@/helpers/supabase";
import { AccountFormData } from "@/types/account";

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

async function updateAccount(accountId: string, data: AccountFormData) {
  try {
    const { data: updatedData, error } = await supabase
      .from("accounts")
      .update(data)
      .eq("id", accountId)
      .single();

    if (error) throw error;

    return updatedData;
  } catch (error) {
    throw error;
  }
}

export { getAccount, updateAccount };
