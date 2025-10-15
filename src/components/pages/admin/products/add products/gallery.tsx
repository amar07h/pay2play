"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { TagsInput } from "@/components/ui/tag-input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProductImagesUpload from "@/components/ProductImagesUpload";

import Lang from "@/lang/admin.json";
import { Form } from "@/components/ui/form";
import { useGalleryForm } from "@/hooks/useGalleryForm";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useStringContext } from "@/context/sharedSeting";
import { useEffect } from "react";

export function GallerySection() {
  const { form, onSubmit, isSubmitting } = useGalleryForm();
  const { value } = useStringContext();
  useEffect(() => {
    if (value) {
      // Get the current array
      const current = form.getValues("url") || [];

      // Check if value is not already included (optional)
      if (!current.includes(value)) {
        form.setValue("url", [...current, value]);
      }
    }
  }, [value, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-20">
        <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
          <CardHeader>
            <CardTitle>{Lang.FileUploadTitle}</CardTitle>
            <CardDescription>{Lang.FileUploadDescritpion}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"product id"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"prodcut id"}
                      className="bg-gaming-dark/50 border-gaming-cyan/30"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {"if of product that need to add it this image"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images </FormLabel>
                  <FormControl>
                    <TagsInput
                      className="w-full h-20"
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="url of singel Product "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-4">
              <ProductImagesUpload bucket="products" />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="bg-gaming-cyan text-gaming-dark hover:bg-gaming-cyan/90 gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Adding...</>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Add options
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
