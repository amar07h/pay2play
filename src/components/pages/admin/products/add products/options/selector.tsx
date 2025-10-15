"use client";
import { useSelector } from "@/hooks/useSendOption";
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

export default function BasicInfoSection() {
  const { form, onSubmit, isSubmitting } = useSelector();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
          <CardHeader>
            <CardTitle>Add varient selector </CardTitle>
            <CardDescription>Set options to varients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="variant_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>varient id </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="8-888-888-88"
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        uid of varient that must include the options
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
                      <FormLabel>varient name </FormLabel>
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

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>varient value</FormLabel>
                      <FormControl>
                        <Input
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
            <div className="flex justify-end space-x-4 mt-12">
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
      </form>
    </Form>
  );
}
