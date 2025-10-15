"use client";
import { useVarient } from "@/hooks/useSendOption";
import { Form } from "@/components/ui/form";
import Lang from "@/lang/admin.json";
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
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function BasicInfoSection() {
  const { form, onSubmit, isSubmitting } = useVarient();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
          <CardHeader>
            <CardTitle>Add Varient </CardTitle>
            <CardDescription>Set Varient to product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="product_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>product id </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="8-888-888-88"
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        uid of product that must include the options
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>varient name </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="qte"
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        set the name to display to database
                      </FormDescription>
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
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Price (TND)</FormLabel>
                      <FormControl>
                        <Input
                          min="0"
                          placeholder="99.99"
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-end w-full space-x-4">
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
                    Add features
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
        <div className="flex justify-end space-x-4 mt-12"></div>
      </form>
    </Form>
  );
}
