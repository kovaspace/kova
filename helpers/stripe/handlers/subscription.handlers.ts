import { Database } from "@/types/database";
import { Subscription } from "@/types/subscriptions";
import { SupabaseClient } from "@supabase/supabase-js";
import { Stripe } from "stripe";

export async function handleSubscriptionCreated(
  stripe: Stripe,
  supabase: SupabaseClient<Database>,
  data: Stripe.Subscription
): Promise<Subscription> {
  const {
    id,
    items,
    status,
    current_period_end,
    current_period_start,
    customer,
    metadata: { account_id },
  } = data;

  const { data: subscription, error: createSubscriptionError } = await supabase
    .from("subscriptions")
    .insert({
      status,
      stripe_subscription_id: id,
      stripe_plan_id: items.data[0].plan.id,
      stripe_price_id: items.data[0].price.id,
      current_period_start: new Date(current_period_start * 1000).toISOString(),
      current_period_end: new Date(current_period_end * 1000).toISOString(),
    })
    .select()
    .single();

  if (createSubscriptionError) throw createSubscriptionError;

  const { error: subscriptionError } = await supabase
    .from("accounts")
    .update({
      subscription_id: subscription.id,
    })
    .eq("stripe_customer_id", customer as string)
    .single();

  if (subscriptionError) throw subscriptionError;

  await stripe.customers.update(customer as string, {
    metadata: {
      account_id: account_id,
    },
  });

  console.log(`Subscription created for account: ${account_id}`);

  return subscription;
}

export async function handleSubscriptionUpdated(
  supabase: SupabaseClient<Database>,
  data: Stripe.Subscription
): Promise<Subscription> {
  try {
    const { id, items, status, current_period_end, current_period_start } =
      data;

    const { data: subscription, error: updateSubscriptionError } =
      await supabase
        .from("subscriptions")
        .update({
          status,
          stripe_plan_id: items.data[0].plan.id,
          stripe_price_id: items.data[0].price.id,
          current_period_start: new Date(
            current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(current_period_end * 1000).toISOString(),
        })
        .eq("stripe_subscription_id", id)
        .select()
        .single();

    if (updateSubscriptionError) throw updateSubscriptionError;

    console.log(
      `Subscription updated for account: ${data.metadata.account_id}`
    );

    return subscription;
  } catch (error) {
    throw error;
  }
}
