import { FC } from "react";
import { ProductReviews } from "@/lib/types/products";
import { Star } from "lucide-react";
import { maskEmail } from "@/lib/common";
interface ProductReviewFormProps {
  reviews: ProductReviews[];
}
const Reviews: FC<ProductReviewFormProps> = ({ reviews }) => {
  // sort the comment by date asc
  const sortedReviews = [...reviews].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  return (
    <div className="gaming-card p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-white mb-6">
        Customer Reviews
      </h3>
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gaming-cyan/20 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-white">
                {review.profiles.name + " "}
                {maskEmail(review.profiles.email)}
              </span>
              <span className="text-sm text-gray-400">
                {review.created_at.slice(0, 10)}
              </span>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "text-gaming-cyan fill-gaming-cyan"
                      : "text-gray-500"
                  }
                />
              ))}
            </div>
            <p className="text-gray-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reviews;
