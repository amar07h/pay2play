"use client";
import { Suspense } from "react";
import ProducPage from "@/components/pages/products/index";
import { Fragment } from "react";
import { Category } from "@/lib/types/layouts";
import {
  homeProduct,
} from "@/lib/types/products";
export default function CategoriesPageClient(props: {
  isAdmin: boolean;
  category:Category
  products:homeProduct[]
}) {
  return (
    
    <Fragment>
      <Suspense fallback={"try again late "}>
        <ProducPage category={props.category} isAdmin={props.isAdmin} products={props.products}/>
      </Suspense>
    </Fragment>
  );
}
