"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import * as appConfig from "@/app.config";
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    appConfig.NEXT_PUBLIC_SUPABASE_URL!,
    appConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
type CheckUserResponse =  { auth: boolean; info:string|null } 

export async function CheckUser(): Promise<CheckUserResponse>  {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
const accessToken = data?.session?.access_token;
  if (accessToken) {
    return {auth:true,info:accessToken};
  } 
  else {
      
     return { auth: false,info:null};
  }
}

export async function IsUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data) {
    return data.user;
  } else {
    return false;
  }
}
