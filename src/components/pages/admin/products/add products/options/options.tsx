"use client";
import { useOptions } from "@/hooks/useSendOption";
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
import { Check } from "lucide-react";
import { TagsInput } from "@/components/ui/tag-input";

export default function BasicInfoSection() {
  const { form, onSubmit, isSubmitting } = useOptions();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
          <CardHeader>
            <CardTitle>Add Options </CardTitle>
            <CardDescription>Set options to product</CardDescription>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>option name </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="qte"
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        set the name to display to selector
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
                    <FormLabel>value </FormLabel>
                    <FormControl>
                      <TagsInput
                        className="w-full h-20"
                        onValueChange={field.onChange}
                        value={field.value}
                        placeholder="some values of options"
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
                    Add options
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
