import { supabase } from "@/helpers/supabase";
import { AccountFormData } from "@/schemas/account";
import { Subscription } from "@/types/subscriptions";
export async function getAccount(accountId: string) {
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

export async function updateAccount(accountId: string, data: AccountFormData) {
  try {
    const { data: updatedData, error } = await supabase
      .from("accounts")
      .update(data)
      .eq("id", accountId)
      .select()
      .single();

    if (error) throw error;

    return updatedData;
  } catch (error) {
    throw error;
  }
}

export async function getAccountSubscription(
  accountId: string
): Promise<Subscription> {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("subscriptions (*)")
      .eq("id", accountId)
      .single();

    if (error || !data.subscriptions) throw error;

    return { ...data.subscriptions };
  } catch (error) {
    throw error;
  }
}
