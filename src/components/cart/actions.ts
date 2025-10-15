/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {createCart} from "@/lib/superbase/cart"
export async function redirectToCheckout() {
  redirect("/checkout");
}
export async function StoredCookies(cart: string) {
  const cookieStore = await cookies();
  cookieStore.set("cart", JSON.stringify(cart));
}
export async function GetCookies() {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart");
  if (cart) {
    return cart.value;
  } else return "not-found";
}

export async function createCartAndSetCookie() {
      const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) {
const cart = await createCart();
if(cart)(await cookies()).set('cartId', cart.id!);
  }
return cartId
}
 export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }
} 