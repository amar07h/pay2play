"use client";
import { FC, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdminLayout from "@/components/layouts/adminLayouts";
import InsertCategoriesForm from "./form";
const InsertCategories: FC = () => {
  const searchParams = useSearchParams();
  // Get category ID from URL query params (for edit mode)
  const categoryId = searchParams.get("id");
  // Logic with searchParams
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            {categoryId ? "Edit Category" : "Add New Category"}
          </h1>
        </div>
        <InsertCategoriesForm categoryId={categoryId} />
      </div>
    </AdminLayout>
  );
};
const AddCategoryPage: FC = () => {
  // Get category ID from URL query params (for edit mode)
  return (
    <Suspense fallback={<div>error</div>}>
      <InsertCategories />
    </Suspense>
  );
};

export default AddCategoryPage;
