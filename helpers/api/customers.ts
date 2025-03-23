import { supabase } from "@/helpers/supabase";
import { CustomerFormData } from "@/schemas/customers";

async function getCustomer(id: string) {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function createCustomer(body: CustomerFormData) {
  try {
    const { data, error } = await supabase
      .from("customers")
      .insert([body])
      .select()
      .single();

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
    const { data, error } = await supabase
      .from("customers")
      .delete()
      .match({ id })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function editCustomer(id: string, body: CustomerFormData) {
  try {
    const { data, error } = await supabase
      .from("customers")
      .update(body)
      .match({ id })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export {
  createCustomer,
  deletCustomer,
  getCustomer,
  getCustomers,
  editCustomer,
};
