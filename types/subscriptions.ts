import { Database } from "../types/database";

type SubscriptionCreate =
  Database["public"]["Tables"]["subscriptions"]["Insert"];
type SubscriptionUpdate =
  Database["public"]["Tables"]["subscriptions"]["Update"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

export type { SubscriptionCreate, SubscriptionUpdate, Subscription };
