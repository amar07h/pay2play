import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Createsub_categories } from "@/lib/superbase/subcategories";
import {
  formSchemaSubCategories,
  FormValuesSubCategories,
  FormValuesCategories,
  formSchemaCategories,
} from "@/lib/validation/index";
import { SubCategory, Category } from "@/lib/types/layouts";
import { useSearchParams } from "next/navigation";
import { generateHandle } from "@/lib/common";
import { CreateCategories, UpdateCategories } from "@/lib/superbase/categories";
export function UseSubCategoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  // Get category ID from URL query params (for edit mode)
  const isEditMode = searchParams.get("id");
  // Generate handle from title
  const form = useForm<FormValuesSubCategories>({
    resolver: zodResolver(formSchemaSubCategories),
    defaultValues: {
      title: "",
      description: "",
      featureImage: "",
      handle: "",
      ispublished: false,
      seo_title: "",
      seo_description: "",
      category_id: "",
      color: "#0ecdf1",
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
  const onSubmit = async (data: FormValuesSubCategories) => {
    setIsSubmitting(true);
    try {
      // Convert form data to match the database model
      const SubCategoryData: SubCategory = {
        handle: data.handle,
        title: data.title,
        description: data.description || "",
        featureImage: data.featureImage,
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        color: data.color,
        ispublished: data.ispublished,
        category_id: data.category_id,
      };
      if (isEditMode) {
        const IsRegistred = await Createsub_categories(SubCategoryData);
        if (IsRegistred.success) {
          await new Promise((resolve) => setTimeout(resolve, 4500));
          toast.success(
            `Sub Category with name ${data.title} was added successfully !`,
          );
          form.reset();
        } else {
          toast.error(
            IsRegistred.message ||
              `Sub Category with name ${data.title} was failed  !`,
          );
        }
      } else {
        await Createsub_categories(SubCategoryData);
        await new Promise((resolve) => setTimeout(resolve, 4500));
        toast.success(
          `Sub Category with name ${data.title} was updated successfully !`,
        );
      }
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
export function UseCategoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  // Get category ID from URL query params (for edit mode)
  const isEditMode = searchParams.get("id");
  const form = useForm<FormValuesCategories>({
    resolver: zodResolver(formSchemaCategories),
    defaultValues: {
      title: "".toLocaleLowerCase().trim(),
      description: "".toLocaleLowerCase().trim(),
      handle: "".toLocaleLowerCase().trim(),
      seo_title: "".toLocaleLowerCase().trim(),
      ispublished: false,
      seo_description: "".toLocaleLowerCase().trim(),
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

  const onSubmit = async (data: FormValuesCategories) => {
    setIsSubmitting(true);
    try {
      // Convert form data to match the database model
      const CategoryData: Category = {
        handle: data.handle,
        title: data.title,
        description: data.description || "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        ispublished: data.ispublished,
      };
      if (!isEditMode) {
        const IsRegistred = await CreateCategories(CategoryData);
        if (IsRegistred.success) {
          await new Promise((resolve) => setTimeout(resolve, 4500));
          toast.success(
            ` Category with name ${data.title} was added successfully !`,
          );
          form.reset();
        } else {
          toast.error(
            IsRegistred.message ||
              `Sub Category with name ${data.title} was failed  !`,
          );
        }
      } else {
        await UpdateCategories(CategoryData, isEditMode);
        await new Promise((resolve) => setTimeout(resolve, 4500));
        toast.success(
          `Sub Category with name ${data.title} was updated successfully !`,
        );
      }
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
