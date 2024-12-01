import supabase from "@/lib/supabase/client";
import { CustomerFormData } from "@/types/customers";

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
    const { firstName, lastName, email } = body;
    const { data, error } = await supabase
      .from("customers")
      .insert([{ first_name: firstName, last_name: lastName, email }])
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
    const { firstName, lastName, email } = body;
    const { data, error } = await supabase
      .from("customers")
      .update({ first_name: firstName, last_name: lastName, email })
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
