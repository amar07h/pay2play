"use server";
import { cookies } from 'next/headers';
import {Cart} from "@/lib/types/cart"
import { createClient } from "@/lib/superbase/server";
export async function getCart(cartId:string): Promise<Cart> {
  if(cartId==undefined)      throw new Error ("invalid cart id");
 const supabase = await createClient();
 
  const { data, error } = await supabase
  .from('cart')
    .select(`
    id,
    totalQuantity,
    cost,
    lines
  `).eq('id',cartId).single()
    if (error) {
    throw new Error (error.message)
  }
  return  data;

  // Old carts becomes `null` when you checkout.

}
 export async function addToCart(cart:Cart): Promise<Cart> {

const formattedLines = cart.lines.map(item => ({
  id: item.id || null,
  quantity: item.quantity,
  cost: {
    totalAmount: {
      amount: parseFloat(item.cost.totalAmount.amount),
      currencyCode: item.cost.totalAmount.currencyCode
    }
  },
  merchandise: {
    id: item.merchandise.id,
    title: item.merchandise.title,
    selectedOptions: item.merchandise.selectedOptions.map(opt => ({
      id: "opt.id",
      name: opt.name,
      value: opt.value
    })),
    product: {
      id: item.merchandise.product.id,
      handle: item.merchandise.product.handle,
      title: item.merchandise.product.title,
      featuredImage: item.merchandise.product.featuredImage
    }
  }
}));
    const supabase = await createClient();
 const { data, error } = await supabase
  .from('cart')
   .update({
    totalQuantity:+1,
    lines: formattedLines  
  }
 ).eq("id",cart.id)
  .select()
  if(data){
  return data[0]
}
  else {
        throw new Error(error.message)}

} 
export async function createCart(): Promise<Cart| undefined> {
    const cartId = (await cookies()).get('cartId')?.value;

  if (cartId) {
    return undefined;
  }
const supabase = await createClient();

const { data,error } = await supabase
  .from('cart')
  .insert(
    {  totalQuantity: 0,cost: {
        subtotalAmount: { amount: 0, currencyCode: 'TND' },
        totalAmount: { amount: 0, currencyCode: 'TND' },
        totalTaxAmount: { amount: 15.0, currencyCode: 'TND' }
      },},
  )
  .select().single()

    if(error)
{
  throw new Error(error.message)
}
  const cookieStore = await cookies()

cookieStore.set({
    name: "cartId",
    value: data.id,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return data
}