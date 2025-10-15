"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/superbase/server";
import { SITE_URL } from "@/app.config";
export type SignUpResponse = { success: boolean; message: string };
export async function signInWithPassword(
  email: string,
  pwd: string,
): Promise<SignUpResponse> {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your input
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pwd,
  });
  try {
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "done" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
export async function signUpNewUser(
  email: string,
  pwd: string,
): Promise<SignUpResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: email,
    password: pwd,
  });
  try {
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "done" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
export async function Google() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${SITE_URL}auth/callback`,
    },
  });
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  // type-casting here for convenience
  // in practice, you should validate your inputs

  if (error) {
    return error.code;
  }
}
export async function signInWithFacebook() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${SITE_URL}auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  if (error) {
    console.log(error);

    return error.code;
  }
}
export async function resetPasswordForEmail(
  email: string,
): Promise<SignUpResponse> {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Please check your email",
  };
}
export async function updatePassword(pwd: string): Promise<SignUpResponse> {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: pwd });
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  return {
    success: true,
    message: "pwd update",
  };
}
export async function SignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/sign-in");
}
