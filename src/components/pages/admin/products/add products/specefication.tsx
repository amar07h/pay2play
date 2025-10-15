"use client";
import { useSpecefiction } from "@/hooks/useSendOption";
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

export default function SpeceficationSection() {
  const { form, onSubmit, isSubmitting } = useSpecefiction();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-gaming-dark/80 border-gaming-cyan/20">
          <CardHeader>
            <CardTitle>Add Specefiction </CardTitle>
            <CardDescription>Set Specefiction to product</CardDescription>
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
                      <FormLabel>specefict name </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name like marque "
                          className="bg-gaming-dark/50 border-gaming-cyan/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        set the name to display to Specefic
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
                      <FormLabel>feature value </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="value like samsung!"
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
