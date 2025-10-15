"use client";
import { FC, useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/adminLayouts";
import { Form } from "@/components/ui/form";
import { useProductForm } from "@/hooks/useProductForm";
import BasicInfoSection from "./basicInfo";
import { InventorySection } from "./inventorySection";
import { SeoSection } from "./seoSection";
import { MediaSection } from "./MediaSection";
import { FormActions } from "./FormActions";
import { GallerySection } from "@/components/pages/admin/products/add products/gallery";
import AddOptionsPage from "@/components/pages/admin/products/add products/options/options";
import AddVarientPage from "@/components/pages/admin/products/add products/options/varient";
import AddSelectorPage from "@/components/pages/admin/products/add products/options/selector";
import Loader from "@/components/ui/loader";
import { StringProvider } from "@/context/sharedSeting";
import Features from "./features";
import Specefication from "./specefication";
import { SubCategory } from "@/lib/types/layouts";
import { GetSubCategories } from "@/lib/superbase/subcategories";

const AddProductPage: FC = () => {
   const [data, setData] = useState<SubCategory[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
      useEffect(() => {
        const fetchCategories = async () => {
          setIsLoading(true);
          setError(null);
          try {
             const response = await GetSubCategories();
          setData(response);
            setIsLoading(false);
          } catch (err) {
            setError(err as Error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchCategories();
      }, []);
  const { form, isSubmitting, onSubmit } = useProductForm();
  //const { data, error, isLoading, isError } = UseGetSubCategories();
  if (isLoading) return <Loader />;

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <AdminLayout>
      <div className="max-w-[1800px] mx-auto pt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white text-center w-full">
            Add New Product
          </h1>
        </div>

        <div className="space-y-8">
          <StringProvider>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 grid grid-cols-2 gap-8"
              >
                {data ? (
                  <BasicInfoSection form={form} categories={data} />
                ) : null}
                <InventorySection form={form} />
                <SeoSection form={form} />
                <MediaSection form={form} />
                <FormActions isSubmitting={isSubmitting} />
              </form>
            </Form>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white text-center w-full">
                Add Product Images{" "}
              </h1>
            </div>
            <GallerySection />
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white text-center w-full">
                  Varient or selector{" "}
                </h1>
              </div>
              <div>
                <div className=" grid grid-cols-2 gap-8">
                  <AddOptionsPage />
                  <AddVarientPage />
                  <AddSelectorPage />
                  <Features />
                  <Specefication />
                </div>
              </div>
            </div>
          </StringProvider>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProductPage;
