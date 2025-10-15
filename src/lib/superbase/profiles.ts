"use server";
import { createClient } from "@/lib/superbase/server";
import { ResponseType } from "@/lib/types/layouts";

export async function UpdateAuth(phone:string,whatsapp:string): Promise<ResponseType> {
 // First, read current metadata
   const supabase = await createClient();

// Then update
const { error } = await supabase.auth.updateUser({
   data: { 
      whatsapp: whatsapp,
      phone: phone,
   }
});
  try {
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "data "};
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
// Verify update
}