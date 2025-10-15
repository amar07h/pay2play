"use server";
import { createClient } from "@/lib/superbase/server";
import { Category, ResponseType } from "@/lib/types/layouts";

export async function CreateCategories(
  formData: Category,
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .insert({
      title: formData.title,
      seo_title: formData.seo_title,
      description: formData.description,
      handle: formData.handle,
      seo_description: formData.seo_description,
      ispublished: formData.ispublished,
    })
    .select();
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
export async function GetCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
     id,
    handle,
    title,
    description,
    seo_title,
    seo_description,
    ispublished`,
    )
    .range(0, 10);
  if (data) {
    return data;
  }
  throw error ? error.message : "Unknown error";
}
export async function GetSingelCategories(params: string): Promise<Category> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
 id,
    handle,
    title,
    description,
    seo_title,
    seo_description,
    ispublished,
    sub_categories (
    title,
    description,
    seo_title,
    seo_description,
    featureImage,
    color,
    category_id,
    handle,
    ispublished
  )
`
    )
    .eq("handle", params)
    .single();
  if (data) {
    return data;
  }
  throw error.message;
}
export async function DeleteCategories(id: string) {
  const supabase = await createClient();
  return await supabase.from("categories").delete().eq("id", id);
}
export async function UpdateCategories(
  formData: Category,
  id: string,
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({
      title: formData.title,
      seo_title: formData.seo_title,
      description: formData.description,
      handle: formData.handle,
      seo_description: formData.seo_description,
      ispublished: formData.ispublished,
    })
    .eq("id", id)
    .select();
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
