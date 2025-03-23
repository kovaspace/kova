import { SupabaseClient } from "@supabase/supabase-js";
import { Stripe } from "stripe";

export async function handleCheckoutCompleted(
  supabase: SupabaseClient,
  data: Stripe.Checkout.Session
) {
  try {
    const { customer, metadata } = data;

    const { data: checkoutAccount, error: checkoutError } = await supabase
      .from("accounts")
      .update({
        stripe_customer_id: customer as string,
      })
      .eq("id", metadata?.account_id as string)
      .select()
      .single();

    if (checkoutError) throw checkoutError;

    console.log(
      `Checkout session completed for account: ${checkoutAccount.id}`
    );

    return checkoutAccount;
  } catch (error) {
    throw error;
  }
}
