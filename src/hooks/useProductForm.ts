import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { CreateProducts } from "@/lib/superbase/products";

import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validation/index";
import { ProductModel } from "@/lib/types/products";

export function useProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Generate handle from title
  const generateHandle = (title: string) => {
    if (!title) return "";
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      handle: "",
      title: "",
      description: "",
      available_for_sale: true,
      featured_image_url: "",
      seo_title: "",
      seo_description: "",
      isfeature: false,
      isnew: true,
      tags: [],
      minprice: 0,
      maxprice: 0,
      category: "",
      originalprice: 1,
    },
  });
  // Update handle when title changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        const handle = generateHandle(value.title || "");
        form.setValue("handle", handle);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // Convert form data to match the database model
      const productData: ProductModel = {
        handle: data.handle,
        title: data.title,
        isFeatured: data.isfeature,
        isNew: data.isnew,
        description: data.description || "",
        available_for_sale: data.available_for_sale || true,
        featured_image_url: data.featured_image_url,
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        tags: data.tags || [],
        minprice: data.minprice || 1,
        maxprice: data.maxprice || 0,
        category: data.category || "",
      };

      const isRegister = await CreateProducts(productData);
      await new Promise((resolve) => setTimeout(resolve, 4500));
      toast.success(
        `Product added successfully with id ${isRegister.message}!`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add product. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
