import supabase from "@/lib/supabase/client";
import { CustomerFormData } from "@/types/customers";

async function createCustomer(body: CustomerFormData) {
  try {
    const { firstName, lastName, email } = body;
    const { data, error } = await supabase
      .from("customers")
      .insert([{ first_name: firstName, last_name: lastName, email }]);

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function getCustomers() {
  try {
    const { data, error } = await supabase.from("customers").select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function deletCustomer(id: string) {
  try {
    const { error } = await supabase.from("customers").delete().match({ id });

    if (error) throw error;

    return;
  } catch (error) {
    throw error;
  }
}

export { createCustomer, deletCustomer, getCustomers };
