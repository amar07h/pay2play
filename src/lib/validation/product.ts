import { z } from "zod";

const ImageSchema = z.object({
  id: z.string(),
  url: z.array(z.string()),
});

const ProductOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  values: z.array(z.string()),
});

const VariantSelectedOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

const ProductVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  available_for_sale: z.boolean(),
  variant_selected_options: z.array(VariantSelectedOptionSchema),
});

const ProductsFeaturesSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.array(z.string()),
});

const ProductSpecificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

const ProductReviewsSchema = z.object({
  id: z.string(),
  rating: z.number(),
  comment: z.string(),
  created_at: z.string(),
  profiles: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
});

export const SingleProductSchema = z.object({
  id: z.string(),
  handle: z.string(),
  isnew: z.boolean(),
  isfeature: z.boolean(),
  title: z.string(),
  description: z.string(),
  available_for_sale: z.boolean(),
  seo_title: z.string(),
  seo_description: z.string(),
  tags: z.array(z.string()),
  minprice: z.number(),
  maxprice: z.number(),
  featured_image_url: z.string(),
  product_images: z.array(ImageSchema),
  product_options: z.array(ProductOptionSchema),
  product_variants: z.array(ProductVariantSchema),
  products_features: z.array(ProductsFeaturesSchema),
  product_specifications: z.array(ProductSpecificationSchema),
  reviews: z.array(ProductReviewsSchema),
});
