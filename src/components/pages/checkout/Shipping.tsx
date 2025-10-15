"use client";
import { FC } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UseProfileForm } from "@/hooks/useProfileForm";
interface FiledInputProps {
  info:string
}
import { Button } from "@/components/ui/button";
const Shipping:FC<FiledInputProps> = ({info }) =>{
        const infos=JSON.parse(info)
    const { form, onSubmit, isSubmitting } = UseProfileForm();
    return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue="shipping"
        className="border rounded-md border-gaming-cyan/20 overflow-hidden"
      >
        <AccordionItem value="shipping" className="border-b-0">
          <AccordionTrigger className="py-3 px-4 hover:bg-gaming-dark/40 hover:no-underline bg-gaming-dark/20 group">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-medium mb-4 flex items-center">
                <span className="bg-gaming-cyan text-gaming-dark rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  2
                </span>
                Shipping Information
              </h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-0 animate-accordion-down">
            <div className="divide-y divide-gaming-cyan/10">
              <div className="gaming-card p-6 rounded-lg mb-6">
                  <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="space-y-3">
                       <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel htmlFor="full_name" className="capitalize">Nom et Prenom</FormLabel>
                        <FormControl>
                          <Input
                          id="full_name"
                            disabled
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                    <div className="space-y-3">
                       <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel htmlFor="email" className="capitalize">Email</FormLabel>
                        <FormControl>
                          <Input
                          id="email"
                          disabled
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                  <div className="space-y-3">
                       <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel htmlFor="phone" className="capitalize">numero</FormLabel>
                        <FormControl>
                          <Input
                          id="phone"
                          type="number"
                          disabled={infos.user.user_metadata.phone? true : false}
                            placeholder="29 557 914 "
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                          <div className="space-y-3">
                       <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel htmlFor="whatsapp" className="capitalize">whatsapp</FormLabel>
                        <FormControl>
                          <Input
                          type="number"
                          id="whatsapp"
                           disabled={infos.user.user_metadata.whatsapp? true : false}
                            placeholder="29 557 914"
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
                   <Button disabled={isSubmitting||infos.user.user_metadata.whatsapp? true : false}
                type="submit"
                className="w-full py-6 text-lg bg-gaming-cyan hover:bg-gaming-cyan/80 text-gaming-dark font-bold"
              >
                {isSubmitting ? (
                      <>order...</>
                    ) : (
                      <div className="flex items-center justify-center gap-2 capitalize">
                        <Check size={8} />
                        enregistrer et continuer
                      </div>
                    )}
              </Button>
</form>
</Form>

              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
export default Shipping