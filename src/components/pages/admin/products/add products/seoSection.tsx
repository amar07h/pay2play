import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validation/index";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SeoSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

export function SeoSection({ form }: SeoSectionProps) {
  return (
    <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
      <CardHeader>
        <CardTitle>SEO Information</CardTitle>
        <CardDescription>
          Optimize your product for search engines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="seo_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Professional Gaming Keyboard with RGB Lighting"
                    className="bg-gaming-dark/50 border-gaming-cyan/30"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Defaults to product title if left empty
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seo_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A high-performance gaming keyboard with customizable RGB lighting, mechanical switches, and durable design."
                    className="bg-gaming-dark/50 border-gaming-cyan/30"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Defaults to product description if left empty
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
