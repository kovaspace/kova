import axios from "axios";

interface ICreateCheckoutSessionProps {
  accountId: string;
  priceId: string;
}

export async function createCheckoutSession({
  accountId,
  priceId,
}: ICreateCheckoutSessionProps) {
  try {
    const response = await axios.post("/api/stripe/create-checkout", {
      accountId,
      priceId,
    });
    const stripeUrl = response.data.sessionUrl;

    return stripeUrl;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
