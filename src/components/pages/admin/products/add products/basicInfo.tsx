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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Lang from "@/lang/admin.json";
import { SubCategory } from "@/lib/types/layouts";
import { TagsInput } from "@/components/ui/tag-input";
interface BasicInfoSectionProps {
  form: UseFormReturn<ProductFormValues>;
  categories: SubCategory[];
}

export default function BasicInfoSection({
  form,
  categories,
}: BasicInfoSectionProps) {
  return (
    <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
      <CardHeader>
        <CardTitle>{Lang.BasicInformationTitle}</CardTitle>
        <CardDescription>{Lang.BasicInformationDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{Lang.BasicInformationProductTitle}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Gaming Keyboard RGB"
                      className="bg-gaming-dark/50 border-gaming-cyan/30"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {Lang.BasicInformationProductLable}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{Lang.BasicInformationProductHandle}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gaming-keyboard-rgb"
                      className="bg-gaming-dark/50 border-gaming-cyan/30"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {Lang.BasicInformationProductHandleLable}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{Lang.BasicInformationProductCategory}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gaming-dark/50 border-gaming-cyan/30">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.title}
                          value={category.id || "1"}
                        >
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available_for_sale"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center h-20 mt-6 justify-between rounded-lg border border-gaming-cyan/30 p-4 bg-gaming-dark/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {Lang.BasicInformationProductAvailable}
                    </FormLabel>
                    <FormDescription>
                      {Lang.BasicInformationProductVisibilityLable}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{Lang.BasicInformationProductDescritpion}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description..."
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
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Tags </FormLabel>
                <FormControl>
                  <TagsInput
                    className="w-full h-20"
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="how to use example "
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
