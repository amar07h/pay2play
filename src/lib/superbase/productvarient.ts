"use server";
import { createClient } from "@/lib/superbase/server";
import { ResponseType } from "@/lib/types/layouts";
export async function CreateOptions(
  name: string,
  product_id: string,
  values: string[],
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("product_options")
    .insert({ product_id: product_id, name: name, values: values })
    .select()
    .single();
  if (data) {
    return { success: true, message: data.id };
  }
  throw new Error(error?.message || "try again later ");
}
export async function CreateVarient(
  title: string,
  product_id: string,
  price: number,
  available_for_sale: boolean,
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("product_variants")
    .insert({
      product_id: product_id,
      title: title,
      price: price,
      available_for_sale: available_for_sale,
    })
    .select()
    .single();
  if (data) {
    return { success: true, message: data.id };
  }
  throw new Error(error?.message || "try again later ");
}
export async function CreateSelector(
  name: string,
  value: string,
  variant_id: string,
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("variant_selected_options")
    .insert({
      name: name,
      value: value,
      variant_id: variant_id,
    })
    .select();
  if (data) {
    return { success: true };
  }
  throw new Error(error.message);
}
export async function CreateFeatures(
  product_id: string,
  name: string,
  value: string[],
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("products_features")
    .insert({
      name: name,
      value: value,
      product_id: product_id,
    })
    .select();
  if (data) {
    return { success: true };
  }
  throw new Error(error.message);
}
export async function CreateSpectifction(
  product_id: string,
  name: string,
  value: string,
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("product_specifications")
    .insert({
      name: name,
      value: value,
      product_id: product_id,
    })
    .select();
  if (data) {
    return { success: true };
  }
  throw new Error(error.message);
}
