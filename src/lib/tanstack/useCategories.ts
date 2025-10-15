import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetCategories, GetSingelCategories } from "@/lib/superbase/categories";
import { GetSubCategories } from "@/lib/superbase/subcategories";
import { Category, SubCategory } from "@/lib/types/layouts";
//? using require to call categories  in Navbar
export const UseGetCategories = (): UseQueryResult<Category[]> => {
  // Queries
  return useQuery({
    queryKey: ["categories"],
    queryFn: GetCategories,
  });
};
//? using require to call categories and sub categories in products page filter
export const UseGetSingelCategories = (
  params: string,
): UseQueryResult<Category> => {
  // Queries
  return useQuery({
    queryKey: ["Singelcategories", params],
    queryFn: () => GetSingelCategories(params),
  });
};
//? it require for admin add page to call all sub categories
export const UseGetSubCategories = (): UseQueryResult<SubCategory[]> => {
  // Queries
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: GetSubCategories,
  });
};
