import supabase from "@/helpers/supabase/client";

async function signInWithPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

async function currentUser() {
  try {
    const { data } = await supabase.auth.getUser();

    return data.user;
  } catch (error) {
    throw error;
  }
}

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  } catch (error) {
    throw error;
  }
}

export { currentUser, logout, signInWithPassword };
