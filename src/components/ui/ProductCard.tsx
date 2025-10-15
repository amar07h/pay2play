import { FC } from "react";
import { Heart, EyeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeProduct } from "@/lib/types/products";
import Image from "next/image";
type ProductCardProps = homeProduct & {
  className?: string;
};
import { S3_ENDPOINT } from "@/app.config";
import Link from "next/link";
const ProductCard: FC<ProductCardProps> = ({
  title,
  featured_image_url,
  minprice,
  isnew,
  subcategory_path,
  isfeature,
  className,
  handle,
}) => {
/*   const discount = originalprice? Math.round((1 - minprice / originalprice) * 100): 0;
 */return (
    <Link href={`/product/${handle}`}>
      <div
        className={cn(
          "gaming-card group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gaming-cyan/10",
          className,
        )}
      >
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={S3_ENDPOINT + featured_image_url}
            alt={title}
            height={500}
            width={500}
            className="w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 h-full"
          />
          {/* Wishlist button*/}
          <button className="absolute top-3 right-3 bg-gaming-dark/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart
              size={18}
              className="text-white hover:text-red-500 transition-colors"
            />
          </button>

          {/* Tags */}
          {isnew && (
            <span className="absolute top-3 left-3 bg-gaming-cyan text-gaming-darker text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isfeature && !isnew && (
            <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </span>
          )}
         {/*  {discount > 0 && (
            <span className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )} */}

          {/* Quick add */}
          <div className="absolute inset-x-0 bottom-0 bg-gaming-dark/90 backdrop-blur-sm py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
            <span className="text-white font-medium">Quick Views </span>
            <button className="text-gaming-cyan hover:text-white transition-colors">
              <EyeIcon size={18} />
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <div className="text-sm text-gray-400 mb-1">{subcategory_path}</div>
          <h3 className="font-semibold text-white mb-1 transition-colors group-hover:text-gaming-cyan line-clamp-1">
            {title}
          </h3>

          {/* Rating
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < rating
                    ? "text-gaming-cyan fill-gaming-cyan"
                    : "text-gray-500"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">
            ({rating.toFixed(1)})
          </span>
        </div>
 }
        {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold  text-gaming-cyan">
              a partie {minprice.toFixed(3)} DT
            </span>
           {/*  {originalprice!==minprice && (
              <span className="text-sm text-gray-400 line-through">
                TND{originalprice.toFixed(3)}
              </span>
            )} */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
