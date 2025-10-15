import { useState, FC, useEffect, useMemo } from "react";
import { Heart, Share2, ArrowLeft, Check } from "lucide-react";
import { addToRecentlyViewed } from '@/lib/common';
import { Button } from "@/components/ui/button";
import { SingelProductModel } from "@/lib/types/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductReviewForm from "./ProductReviewForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddToCart } from "@/components/cart/add-to-cart";
import Galleries from "./galleries";
import { VariantSelector } from "./varient-selector";
import Reviews from "./reviews";
import { useProduct } from "@/context/product.context";
interface ProductDetailsProps {
  product: SingelProductModel;
  isAdmin: boolean;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, isAdmin }) => {
  const router = useRouter();
  // Add product to recently viewed on component mount
 useEffect(() => {
    addToRecentlyViewed({
      isfeature:product.isfeature,
      isnew:product.isnew,
      product_id: product.id,
      title: product.title,
      featured_image_url: product.featured_image_url,
      handle: product.handle,
      minprice: product.minprice,
    });
  }, [product]);
  const [quantity, setQuantity] = useState<number>(1);
  const { state, setSelectedVariant } = useProduct();
  const [price, setPrice] = useState<number | null>(null);
  const matchingVariant = useMemo(() => {
    return product.product_variants.find((variant) =>
      variant.variant_selected_options.every((option) => {
        const selectedValue = state[option.name.toLowerCase()];
        return selectedValue === option.value;
      }),
    );
  }, [state, product.product_variants]);
  useEffect(() => {
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);

      setPrice(matchingVariant.price);
    } else {
      setPrice(null);
    }
  }, [setSelectedVariant, matchingVariant]);
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  /* const discount = product.originalprice
    ? product.originalprice - product.minprice
    : 0; */

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gaming-cyan mb-6 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back to Products</span>
      </div>
      {isAdmin ? (
        <Link
          href={`/admin/add-product/gallery/${product.id}`}
          className="flex items-center gap-2 text-gaming-cyan mb-6 hover:text-white transition-colors"
        >
          <span>go to edite Products</span>
        </Link>
      ) : null}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Galleries
          product_images={product.product_images[0].url||''}
          title={product.title}
        />

        <div className="animate-slide-in">
          <div className="text-sm text-gray-400 mb-1 ">{product.title}</div>
          <h1 className="text-3xl font-bold text-white mb-3 text-center animate-glow">
            {product.title}
          </h1>

          {/*   <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < product.rating ? "text-gaming-cyan fill-gaming-cyan" : "text-gray-500"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({product.rating.toFixed(1)})</span>
          </div>
           */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl text-white bg-red-500 font-bold px-2 py-1 rounded">
              {price
                ? price.toFixed(3)
                : product.minprice!==product.maxprice  ?
                   product.minprice.toFixed(3)+ " - " + product.maxprice.toFixed(3):
                product.minprice.toFixed(3)
                }
              {" "} DT

            </span>
         {/*    {product.originalprice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  TND{product.originalprice.toFixed(3)}
                </span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {discount.toFixed(3)}TND
                </span>
              </>
            )} */}
          </div>

          <p className="text-gray-300 mb-6">{product.description}</p>
          <VariantSelector
            variants={product.product_variants}
            options={product.product_options}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-5 mb-8">
            <div className="flex h-12 w-36 border border-gaming-cyan/30 rounded-md overflow-hidden">
              <button
                className="w-12 bg-gaming-dark flex items-center justify-center text-white hover:bg-gaming-cyan hover:text-gaming-dark transition-colors"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <div className="flex-1 flex items-center justify-center text-white">
                {quantity}
              </div>
              <button
                className="w-12 bg-gaming-dark flex items-center justify-center text-white hover:bg-gaming-cyan hover:text-gaming-dark transition-colors"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            <AddToCart product={product} />

            <Button
              variant="outline"
              className="h-12 px-4 border-gaming-cyan/30 text-white hover:bg-gaming-dark hover:border-gaming-cyan transition-transform hover:scale-105"
            >
              <Heart size={18} />
            </Button>
          </div>

          <div className="glass-effect p-4 rounded-lg mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Check size={18} className="text-green-500" />
              <span className="text-white">In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-500" />
              <span className="text-white">livraison gratuit</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400">Share:</span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 p-0 text-white hover:text-gaming-cyan"
            >
              <Share2 size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-gaming-dark border-b border-gaming-cyan/20 rounded-none h-auto">
            <TabsTrigger
              value="description"
              className="py-3 data-[state=active]:bg-transparent data-[state=active]:text-gaming-cyan data-[state=active]:border-b-2 data-[state=active]:border-gaming-cyan rounded-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="py-3 data-[state=active]:bg-transparent capitalize data-[state=active]:text-gaming-cyan data-[state=active]:border-b-2 data-[state=active]:border-gaming-cyan rounded-none"
            >
              Specefication
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="py-3 data-[state=active]:bg-transparent data-[state=active]:text-gaming-cyan data-[state=active]:border-b-2 data-[state=active]:border-gaming-cyan rounded-none"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 mb-16 animate-fade-in">
            <TabsContent value="description" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="gaming-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                </div>
                {!product.products_features[0] ? null : (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {product.products_features[0].name}
                    </h3>
                    <ul className="space-y-3">
                      {product.products_features[0].value.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <Check
                              size={18}
                              className="text-gaming-cyan mt-1 shrink-0"
                            />
                            <span>{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <div className="gaming-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-4 capitalize">
                  Specefication
                </h3>
                <table className="w-full">
                  <tbody>
                    {product.product_specifications.map((spec, index) => (
                      <tr
                        key={index}
                        className={
                          index !== product.product_specifications.length - 1
                            ? "border-b border-gaming-cyan/20"
                            : ""
                        }
                      >
                        <td className="py-3 text-gray-400">{spec.name}</td>
                        <td className="py-3 text-white">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <Reviews reviews={product.reviews} />

              <ProductReviewForm productId={product.id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
