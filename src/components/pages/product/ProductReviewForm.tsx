import { FC, useState, forwardRef, useEffect } from "react";
import { UseReviewForm } from "@/hooks/useReview";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ProductReviewFormProps {
  productId: string;
}
const ProductReviewForm: FC<ProductReviewFormProps> = ({ productId }) => {
  const { form, onSubmit, isSubmitting } = UseReviewForm();
  const RatingInput = forwardRef<
    HTMLDivElement,
    { value: number; onChange: (value: number) => void }
  >(({ value, onChange }, ref) => {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    const getCurrentRating = (starPosition: number) => {
      return (hoveredRating !== null ? hoveredRating : value) >= starPosition;
    };

    return (
      <div ref={ref} className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((starPosition) => (
          <button
            key={starPosition}
            type="button"
            onClick={() => onChange(starPosition)}
            onMouseEnter={() => setHoveredRating(starPosition)}
            onMouseLeave={() => setHoveredRating(null)}
            className="text-2xl transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              size={28}
              className={
                getCurrentRating(starPosition)
                  ? "text-gaming-cyan fill-gaming-cyan"
                  : "text-gray-500"
              }
            />
          </button>
        ))}
        <span className="text-gray-400 ml-2">
          {value > 0 ? `${value}/5` : "Select a rating"}
        </span>
      </div>
    );
  });

  RatingInput.displayName = "RatingInput";

  useEffect(() => {
    form.setValue("product_id", productId);
  }, [form, productId]);

  return (
    <div className="gaming-card p-6 rounded-xl mt-8">
      <h3 className="text-xl font-semibold text-white mb-6">Write a Review</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {false && (
            <FormField
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-white mb-2">
                    Your Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="w-full bg-gaming-dark border border-gaming-cyan/30 rounded-md p-2 text-white"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-white mb-2">avis</FormLabel>
                <FormControl>
                  <RatingInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-white mb-2">
                  votre commentaire
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[120px] w-full bg-gaming-dark border border-gaming-cyan/30 rounded-md p-2 text-white resize-none"
                    placeholder="Share your thoughts about this product..."
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-gaming-cyan text-gaming-dark hover:bg-gaming-cyan/90 gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>ajouter...</>
            ) : (
              <>
                <Check className="h-4 w-4" />
                ajouter comment
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductReviewForm;
