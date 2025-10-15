import { useEffect, FC, Fragment, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { FormSelect } from "@/components/ui/form-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExtractArray } from "@/lib/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/ui/loader";
import { GetSubCategories } from "@/lib/superbase/subcategories";
import { Category } from "@/lib/types/layouts";
import ProductImagesUpload from "@/components/ProductImagesUpload";
import { useStringContext } from "@/context/sharedSeting";
import { UseSubCategoryForm } from "@/hooks/useLayoutsForm";
import { Check } from "lucide-react";
interface CategoryCardProps {
  Category: Category[];
}
export const InsertSubCategoriesForm: FC<CategoryCardProps> = ({
  Category,
}) => {
  const { value } = useStringContext();
  const [isLoading, setIsLoading] = useState(true);
//* Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
    
      await GetSubCategories();
        setIsLoading(false);
   
    };
    fetchCategories();
  }, []);
  //get all categories by name
  const CategoriesTitle: { value: string; label: string }[] = ExtractArray(
    Category,
  ).filter(
    (item): item is { value: string; label: string } =>
      item.value !== undefined,
  );

  //const { isLoading } = UseGetSubCategories();
  const { form, onSubmit, isSubmitting } = UseSubCategoryForm();
  useEffect(() => {
    if (value) {
      form.setValue("featureImage", value);
    }
  }, [value, form]);
  return (
    <Fragment>
      {" "}
      {isLoading ? ( 
        <div className="fixed left-1/2 top-2/4">
          <Loader />
        </div>
      ) : (
        <Card className="bg-gaming-dark border-gaming-cyan/20">
          <CardHeader>
            <CardTitle className="text-2xl">SubCategory Details</CardTitle>
            <CardDescription className=" text-2xl">
              Enter the information for the product category.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Keyboards"
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seo_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Seo Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="offre"
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Color</FormLabel>
                        <div className="flex gap-4">
                          <Input
                            type="color"
                            className="w-16 h-10 p-1 bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                          <FormControl>
                            <Input
                              className="bg-gaming-dark/50 border-gaming-cyan/30"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featureImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>passet asset url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={value}
                            className="bg-gaming-dark/50 border-gaming-cyan/30 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4 md:col-span-2 ">
                    <ProductImagesUpload bucket="layouts" />
                  </div>

                  <FormField
                    control={form.control}
                    name="handle"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Sub Category route handle</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="/game"
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Sub Category Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter category description..."
                            className="bg-gaming-dark/50 border-gaming-cyan/30  min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seo_description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Sub Category Seo Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter seo category description..."
                            className="bg-gaming-dark/50 border-gaming-cyan/30 min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ispublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between md:col-span-2">
                        <FormLabel>visibiltie to home page</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-gaming-cyan "
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormSelect
                    control={form.control}
                    name="category_id"
                    label="category id"
                    placeholder="Select your category"
                    options={CategoriesTitle}
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    type="submit"
                    className="bg-gaming-cyan text-gaming-dark hover:bg-gaming-cyan/90 gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>wait...</>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        end successful
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};
export default InsertSubCategoriesForm;
