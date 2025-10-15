"use server";
import type { Metadata } from "next";
import { GetSingelProduct } from "@/lib/superbase/products";
import ProductDetails from "./ProductPage";
import { notFound } from "next/navigation";
import { SingelProductModel } from "@/lib/types/products";
import { ProductProvider } from "@/context/product.context";
export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const productResponce: SingelProductModel|null = (
    await GetSingelProduct(params.handle)
  );
    if(!productResponce) {
    return notFound();}
  const product: SingelProductModel = productResponce;

  if (!product) return notFound();
  const rawUrl = product.product_images?.[0]?.url;
  const url = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl;
  const indexable = !!product.title;
  return {
    title: product.title,
    description: product.seo_description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          description: product.seo_description,
          images: [
            {
              url,
            },
          ],
        }
      : null,
  };
}
import { IsUser } from "@/lib/superbase/server";
import { ADMIN_EMAIL } from "@/app.config";
export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = (await props.params).handle;
  const user = await IsUser();
  return (
    <div className="min-h-screen gaming-gradient">
      <div className="pt-20 pb-10">
        <ProductProvider>
          <ProductDetails 
            handle={params}
            isAdmin={user && user?.email === ADMIN_EMAIL ? true : false}
          />
        </ProductProvider>
      </div>
    </div>
  );
}
