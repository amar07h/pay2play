import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { CreateReviews } from "@/lib/superbase/products";
import { ReviewFormSchema, ReviewFormValue } from "@/lib/validation/index";
import { useState } from "react";

export function UseReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValue>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      comment: "",
      rating: 5,
      product_id: "",
    },
  });

  const onSubmit = async (data: ReviewFormValue) => {
    setIsSubmitting(true);
    // Convert form data to match the database model
    const { success } = await CreateReviews(
      data.product_id,
      data.comment,
      data.rating,
    );
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("merci pour votre commenter!");
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
