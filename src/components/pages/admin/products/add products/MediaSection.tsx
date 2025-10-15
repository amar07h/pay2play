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
import ProductImagesUpload from "@/components/ProductImagesUpload";
import Lang from "@/lang/admin.json";
import { useStringContext } from "@/context/sharedSeting";
import { useEffect } from "react";

interface MediaSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

export function MediaSection({ form }: MediaSectionProps) {
  const { value } = useStringContext();

  useEffect(() => {
    if (value) {
      form.setValue("featured_image_url", value);
    }
  }, [value, form]);
  return (
    <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
      <CardHeader>
        <CardTitle>{Lang.FileUploadTitle}</CardTitle>
        <CardDescription>{Lang.FileUploadDescritpion}</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="featured_image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{Lang.FileUploadLable}</FormLabel>
              <FormControl>
                <Input
                  placeholder={value}
                  className="bg-gaming-dark/50 border-gaming-cyan/30"
                  {...field}
                />
              </FormControl>
              <FormDescription>{Lang.FileUploadForm}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4">
          <ProductImagesUpload bucket="products" />
        </div>
      </CardContent>
    </Card>
  );
}
