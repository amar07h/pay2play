import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { UploadGallery } from "@/lib/superbase/products";

import { ImagesFormValue, galleryFormSchema } from "@/lib/validation/index";
import { useState } from "react";

export function useGalleryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ImagesFormValue>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      url: [""],
      product_id: "",
    },
  });

  const onSubmit = async (data: ImagesFormValue) => {
    setIsSubmitting(true);

    // Convert form data to match the database model
    const { success } = await UploadGallery(data.url, data.product_id);
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("image added successfully!");
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
