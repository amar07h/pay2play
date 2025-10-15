"use server";
import { GetSingelCategories } from "@/lib/superbase/categories";
import CategoriesDetails from "./finalPageClient";
import { Category } from "@/lib/types/layouts";
import { Fragment, Suspense } from "react";
import { Metadata } from "next";
import { IsUser } from "@/lib/superbase/server";
import { ADMIN_EMAIL } from "@/app.config";
import { GetProducts } from "@/lib/superbase/products";

import {
  homeProduct,
} from "@/lib/types/products";
export async function generateMetadata(props: {
  params: Promise<{ products: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const categorieResponce: Category = await GetSingelCategories(
    params.products,
  );
  const categorie: Category = categorieResponce;
  const ogImageUrl = `${process.env.SITE_URL}/api/og?title=${encodeURIComponent(categorie.title)}`;

  const indexable = !!categorie.title;
  return {
    title: categorie.title,
    description: categorie.seo_description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      title: categorie.title,
      description: categorie.seo_description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: categorie.title,
        },
      ],
    },
  };
}
export default async function Page(props: {
  params: Promise<{ products: string }>;
}) {
  
  let isAdmin: boolean = false;
  //*todo  find an other way to handle ts error
  const user = await IsUser();
  if (user && typeof user === "object" && "email" in user) {
    isAdmin = user.email == ADMIN_EMAIL ? true : false;
  }
  //? get all sub categories from catgories
  const params = (await props.params).products;
  const categorieResponce: Category = await GetSingelCategories(
    params
  );
//? get products based on params 
const products :homeProduct[]=await GetProducts(categorieResponce.handle, 1, 20);
  return (
    <Fragment>
      <Suspense fallback={"try again later"}>
      <CategoriesDetails category={categorieResponce} isAdmin={isAdmin} products={products} />
    </Suspense>
 
    </Fragment>
  );
}
