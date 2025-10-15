"use client";
import { FC, Suspense, useEffect, useState } from "react";
import { GetCategories } from "@/lib/superbase/categories";
import AdminLayout from "@/components/layouts/adminLayouts";
import InsertSubCategoriesForm from "./form";
import { StringProvider } from "@/context/sharedSeting";
import { Category } from "@/lib/types/layouts";

const AddCategoryPage: FC =  () => {
   const [data, setData] = useState<Category[] | null>(null);
  //* Fetch categories on component mount
    useEffect(() => {
      const fetchCategories = async () => {
           const response = await GetCategories();
        setData(response);
       
      };
      fetchCategories();
    }, []);
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Add New SubCategory</h1>
        </div>
        <Suspense fallback={<div>Failed to fetch data</div>}>
          {data ? (
            <StringProvider>
              <InsertSubCategoriesForm Category={data} />
            </StringProvider>
          ) : null}
        </Suspense>
      </div>
    </AdminLayout>
  );
};

export default AddCategoryPage;
