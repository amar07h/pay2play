import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validation/index";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface InventorySectionProps {
  form: UseFormReturn<ProductFormValues>;
}

export function InventorySection({ form }: InventorySectionProps) {
  return (
    <Card className="bg-gaming-dark/80 border-gaming-cyan/20 h-auto">
      <CardHeader>
        <CardTitle>Inventory Information</CardTitle>
        <CardDescription>Manage stock and pricing details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="minprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Price (TND)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="99.99"
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
              name="maxprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Price (TND)</FormLabel>
                  <FormControl>
                    <Input
                      aria-valuemin={0}
                      type="number"
                      min="0"
                      step="1"
                      placeholder="100.00"
                      className="bg-gaming-dark/50 border-gaming-cyan/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="isnew"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center h-20 mt-6 justify-between rounded-lg border border-gaming-cyan/30 p-4 bg-gaming-dark/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">New Product</FormLabel>
                    <FormDescription>set this product new?!</FormDescription>
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
            <FormField
              control={form.control}
              name="isfeature"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center h-20 mt-6 justify-between rounded-lg border border-gaming-cyan/30 p-4 bg-gaming-dark/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">feature Product</FormLabel>
                    <FormDescription>
                      set this product if it feature and display on home page?!
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
        </div>
      </CardContent>
    </Card>
  );
}
