import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Use the latest API version
});

// Add this features mapping object
const priceFeatures: Record<string, string[]> = {
  [process.env.NEXT_PUBLIC_STRIPE_FREE_PLAN_PRICE_ID!]: [
    "1 facility listing",
    "Up to 5 spaces",
    "Basic booking calendar",
    "Up to 50 bookings/month",
    "Email support",
    "Basic analytics",
  ],
  [process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID!]: [
    "Up to 5 facilities listings",
    "Up to 10 spaces",
    "Advanced booking system",
    "Unlimited bookings",
    "Priority support",
    "Advanced analytics & reporting",
    "Custom branding",
    "Multiple payment methods",
    "Automated reminders",
  ],
};

export async function getSubscriptionPlans(currentPriceId?: string | null) {
  const prices = await stripe.prices.list({
    active: true,
    expand: ["data.product"],
  });

  return prices.data.map((price) => {
    const product = price.product as Stripe.Product;

    return {
      id: price.id,
      priceId: price.id,
      name: product.name,
      description: product.description,
      price: new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: price.currency,
      }).format(price.unit_amount! / 100),
      features: priceFeatures[price.id] || [],
      current: price.id === currentPriceId,
    };
  });
}

export async function getSubscriptionById(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price.product", "customer"],
    });

    console.log(subscription);

    return subscription;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw error;
  }
}
