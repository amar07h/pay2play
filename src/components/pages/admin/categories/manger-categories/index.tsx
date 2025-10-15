"use client";
import AdminLayout from "@/components/layouts/adminLayouts";
import CategoryCard from "@/components/pages/admin/categories/manger-categories/card";
import Loader from "@/components/ui/loader";
import Header from "./header";
import { UseGetCategories } from "@/lib/tanstack/useCategories";
import { DeleteCategories } from "@/lib/superbase/categories";
import { toast } from "react-hot-toast";
const ManageCategoriesPage: React.FC = () => {
  // Queries
  const { data, error, isLoading, isError } = UseGetCategories();

  if (isError) {
    return <div>{error.message}</div>;
  }
  // Handle category deletion
  async function handleDeleteCategory(id: string) {
    await DeleteCategories(id);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Deleting category...",
      success: () => {
        return "Category deleted successfully!";
      },
      error: "Failed to delete category.",
    });
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto mt-20">
        <Header />
        {isLoading ? (
          <div className="fixed left-1/2 top-2/4">
            <Loader />
          </div>
        ) : null}
        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCategoriesPage;
