"use server";
import { createClient } from "@/lib/superbase/server";
import { SubCategory, ResponseType } from "@/lib/types/layouts";
export async function Createsub_categories(
  formData: SubCategory,
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sub_categories")
    .insert({
      title: formData.title,
      seo_title: formData.seo_title,
      description: formData.description,
      handle: formData.handle,
      seo_description: formData.seo_description,
      featureImage: formData.featureImage,
      color: formData.color,
      ispublished: formData.ispublished,
      category_id: formData.category_id,
    })
    .select()
    .single();
  try {
    if (error) {
      throw error.message;
    } else {
      return { success: true };
    }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
export async function Deletesub_categories(id: string) {
  const supabase = await createClient();
  return await supabase.from("sub_categories").delete().eq("handle", id);
}
export async function Updatesub_categories(
  data: SubCategory,
  id: string,
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sub_categories")
    .update({
      title: data.title,
      seo_title: data.seo_title,
      description: data.description,
      handle: data.handle,
      seo_description: data.seo_description,
      featureImage: data.featureImage,
      color: data.color,
      ispublished: data.ispublished,
      category_id: data.category_id,
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
export async function GetSubCategories(): Promise<SubCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sub_categories")
    .select(
      `
    id,
    title,seo_title,description,seo_description,handle,color,ispublished,category_id,featureImage
`
    )
    .range(0, 10)
    .eq("ispublished", true);
  if (data) {
    return data;
  }
  throw error.message;
}
