import { useEffect, Fragment, FC,useState } from "react";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Switch } from "@/components/ui/switch";
import { UseCategoryForm } from "@/hooks/useLayoutsForm";
import { GetCategories } from "@/lib/superbase/categories";

import Loader from "@/components/ui/loader";
import { Check } from "lucide-react";
import { Category } from "@/lib/types/layouts";
interface CategoryCardProps {
  categoryId: string | null;
}

export const  InsertCategoriesForm: FC<CategoryCardProps> = ({ categoryId }) => {
 const [data, setData] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await GetCategories();
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const { form, onSubmit, isSubmitting } = UseCategoryForm();
  // Fetch category data if in edit mode
  useEffect(() => {
    if (categoryId) {
      const category = data?.find((cat) => cat.id === categoryId);
      if (category) {
        form.reset({
          title: category.title,
          handle: category.handle,
          description: category.seo_description || "",
          seo_title: category.title,
          ispublished: category.ispublished,
          seo_description: category.seo_description || "",
        });
      }
    }
  }, [categoryId, form, data]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed left-1/2 top-2/4">
          <Loader />
        </div>
      ) : (
        <Card className="bg-gaming-dark border-gaming-cyan/20">
          <CardHeader>
            <CardTitle className="text-2xl">Category Details</CardTitle>
            <CardDescription className=" text-2xl">
              Enter the information for the {categoryId ? "existing" : "new"}{" "}
              product category.
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
                    name="handle"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Category route handle</FormLabel>
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
                        <FormLabel>Category Description</FormLabel>
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
                        <FormLabel>Category Seo Description</FormLabel>
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
      {error ? (
        <div className="fixed left-1/2 top-2/4">{error.message}</div>
      ) : null}
    </Fragment>
  );
};
export default InsertCategoriesForm;
