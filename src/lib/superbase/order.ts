"use server";
import { createClient } from "@/lib/superbase/server";
import { ResponseType } from "@/lib/types/layouts";
import { Order } from "@/lib/types/order";
import { cookies } from 'next/headers'

export async function SendOrder(fullname:string, phone:  string,email:  string,whatsapp:  string,cart_id: string): Promise<ResponseType> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_order_and_link_cart_uuid",
    {
       p_cart_id: cart_id,
      p_fullname:fullname,
      p_phone:phone,
      p_email:email,  
      p_whatsapp:whatsapp,
    })
  if (data) {
    (await cookies()).delete('cartId')
    return { success: true };
  }
  if (error) {
    console.error( error);
  return { success: false, message: error.message };
}
throw new Error("Unexpected error occurred" );
}
export async function GetOrder(): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      created_at,
      fullname,
      email,
      whatsapp,
      phone,
      invoice,
      cart (
      id,
      totalQuantity,
      cost,
      lines        
      )
    `
    ) 
    .limit(20)
    .order('created_at', { ascending: false });
  if (error || !data) {
    throw error || new Error("Failed to fetch orders");
  }
  return data as Order[]; ;
}