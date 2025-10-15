import { GetSingelProduct } from "@/lib/superbase/products";
import ProductPageClient from "./ProductPageClient";
import { SingelProductModel } from "@/lib/types/products";
import { notFound } from "next/navigation";

export default async function ProductPage(props: {
  handle: string;
  isAdmin: boolean;
}) {
  const params = props.handle;
  const isAdmin = props.isAdmin;
  const ProductDetails:SingelProductModel|null=await GetSingelProduct(params)
  if(!ProductDetails) {
    return notFound();}
    
  return (
      <ProductPageClient productDetail={ProductDetails} isAdmin={isAdmin} />
  );
}
