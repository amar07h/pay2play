"use client";
import { Suspense } from "react";
import ProductDetails from "@/components/pages/product";
import { Fragment } from "react";
import { SingelProductModel } from "@/lib/types/products";
export default function ProductPageClient(props: {
  isAdmin: boolean;
  productDetail:SingelProductModel
}) {
  return (
    <Fragment>
      <Suspense fallback={"try again late "}>
        <ProductDetails product={props.productDetail} isAdmin={props.isAdmin}/>
      </Suspense>
    </Fragment>
  );
}
