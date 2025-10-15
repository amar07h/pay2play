"use client";
import { Suspense, FC, Fragment, useState } from "react";
import SubCategories from "@/components/pages/product/subcategories";
import Search from "./filtre";
import { Category } from "@/lib/types/layouts";
import {homeProduct} from "@/lib/types/products"
interface CategoryInterface {
  category: Category;
  isAdmin: boolean;
  products:homeProduct[]
  
}
const ProductsPage: FC<CategoryInterface> = ({ category, isAdmin,products }) => {
  //? get only title for sub categories
      const [subcategories, setSubCategories] = useState<string>('');
  if (category && category.sub_categories) {
    const subCategories = category.sub_categories.map((user) => user.title);
    return (
      <div className="min-h-screen gaming-gradient">
        <div className="max-w-7xl mx-auto pt-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Suspense fallback={"لا توجد بيانات "}>
              {category.sub_categories?.map((c) => (
                <Fragment key={Math.random()}  >
                  <div onClick={() => setSubCategories(c.title)} className="cursor-pointer">
                  <SubCategories SubCategory={c} isAdmin={isAdmin} />
                  </div>
                </Fragment>
              ))}
            </Suspense>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-3xl font-bold text-white mb-2 capitalize text-center">
            {category?.title}
          </h1>
          <p className="text-gray-400 mb-8 text-lg capitalize">
            {category?.description}
          </p>

          {/* Search Filters,and Sort Controls for Product Grid */}
          <Suspense fallback={"error getting products"}>
            <Search SubCategory={subCategories} Products={products} filterd={subcategories}/>
          </Suspense>
        </div>
      </div>
    );
  }
};

export default ProductsPage;
