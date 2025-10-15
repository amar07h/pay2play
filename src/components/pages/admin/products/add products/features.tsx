"use client";
import { useFeatures } from "@/hooks/useSendOption";
import { Form } from "@/components/ui/form";
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
import { TagsInput } from "@/components/ui/tag-input";
import { Check } from "lucide-react";

export default function FeatureSection() {
  const { form, onSubmit, isSubmitting } = useFeatures();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
          <CardHeader>
            <CardTitle>Add Features </CardTitle>
            <CardDescription>Set Features to product</CardDescription>
          </CardHeader>
          <CardContent> 
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <FormField
                  control={form.control}
                  name="product_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>product id </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="8hfghfg-888-888-88"
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        uid of product that must include the features
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>feature name </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="how to use ??!!"
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        set the name to display to feature
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            
              </div>
                  <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>features listes </FormLabel>
                      <FormControl>
                        <TagsInput
                          className="w-full h-40 grid-cols-1"
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
      </form>
    </Form>
  );
}
