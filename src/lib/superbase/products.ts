"use server";

import { createClient } from "@/lib/superbase/server";
import { SingleProductSchema } from "@/lib/validation/product";
import {
  homeProduct,
  SingelProductModel,
  ProductModel,
} from "@/lib/types/products";
import { ResponseType } from "@/lib/types/layouts";
import { v4 as uuidv4 } from "uuid";
type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
};

export async function CreateProducts(
  productData: ProductModel
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("products")
    .insert({
      handle: productData.handle,
      isnew: productData.isNew,
      isfeature: productData.isFeatured,
      available_for_sale: productData.available_for_sale,
      title: productData.title,
      description: productData.description,
      featured_image_url: productData.featured_image_url,
      seo_title: productData.seo_title,
      seo_description: productData.seo_description,
      tags: productData.tags,
      sub_category_id: productData.category,
      maxprice: productData.maxprice,
      minprice: productData.minprice,
    })
    .select();
  try {
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: data[0].id };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
export const UploadFile = async ({ file, bucket }: UploadProps) => {
  const supabase = await createClient();
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${uuidv4()}.${fileExtension}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  if (data) {
    return { imageUrl: data.fullPath, error: "" };
  }
  if (error) {
    return { imageUrl: "", error: error.message };
  } else {
    return {
      imageUrl: "",
      error: "server error try again later or next few years",
    };
  }
};
export async function UploadGallery(
  url: string[],
  product_id: string
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("product_images")
    .insert([{ url: url, product_id: product_id }])
    .select();
  if (data) {
    return { success: true, message: data[0].id };
  }
  throw new Error(error.message);
}
export async function GetProducts(
  pathname: string,
  page: number,
  limit: number
): Promise<homeProduct[]> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const pathnames = pathname === "all" ? "*" : pathname;
  const supabase = await createClient();
  const productWithSubCategorie = await supabase
    .from("products_with_category")
    .select("*")
    .eq(pathnames === "*" ? "*" : "category_path", pathnames)
    .range(from, to);
  const { data, error } = productWithSubCategorie;
  if (error) {
    throw new Error("smothing not work correctly please try again later");
  }
  return data;
}
export async function GetProductAds(): Promise<string[]|string> {
  const supabase = await createClient();
  const { data, error } = await supabase
   .from('deal')
  .select('image_url')
  .range(0, 9)
  if (error) {
    return error.message;
  }
  return data.map((item) => item.image_url);
}
export async function GetSingelProduct(
  params: string
): Promise<SingelProductModel | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      handle,
      title,
      description,
      available_for_sale,
      seo_title,
      seo_description,
      isnew,
      isfeature,
      tags,
      minprice,
      maxprice,
      featured_image_url,
      product_images (
        id,
        url
      ),
      product_options(
      id,
      name,
      values
      ),
      product_variants(
      id,
       price,
      title,
      available_for_sale,
      variant_selected_options (
        id,
        name,
        value
        )
        ),
      products_features(
        id,
        name,
        value
        ),
        product_specifications(
        id,name,value
        ),
    reviews (
      id,
      rating,
      comment,
      created_at,
      profiles (
      id,
      name,
      email
)
    )
     )
    `
    )
    .eq("handle", params)
    .single();

  if (error || !data) {
    return null;
  }
  const result = SingleProductSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid product data format");
  }
  const product = result.data;
  return product;
}
import { cleanComment } from "@/lib/common";
export async function CreateReviews(
  product_id: string,
  comment: string,
  rating: number
): Promise<ResponseType> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("reviews")
    .insert({
      rating: rating,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      comment: cleanComment(comment),
      product_id: product_id,
    })
    .select();
  if (data) {
    return { success: true };
  }
  throw new Error(error.message);
}

