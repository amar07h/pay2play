import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetProductAds } from "@/lib/superbase/products";
import { ProductAd } from "@/lib/types/products";
type ResponseTypeGET = ProductAd;

export const GetProductsHook = (): UseQueryResult<ResponseTypeGET> => {
  // Queries
  return useQuery<ResponseTypeGET>({
    queryKey: ["hero"],
    queryFn: GetProductAds,
  });
};
