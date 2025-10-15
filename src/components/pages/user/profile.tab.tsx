import React, { Fragment, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseProfileForm } from "@/hooks/useProfileForm";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/ui/loader";
interface User {
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  phone: string;
  whatsapp: string;
  //order: string;
}
interface UserProps {
  user: User;
}
const ProfileTab: React.FC<UserProps> = ({ user }) => {
      const { form, onSubmit, isSubmitting } = UseProfileForm();
  // Update handle when title changes
    useEffect(() => {
      const subscription = form.watch((value, { name }) => {
        if (name === "full_name") {
          form.setValue("full_name", value.full_name||user.name);
          
        }
        if (name === "email") {
          form.setValue("email",value.email|| user.email);
        }
        if (name === "phone") {
          form.setValue("phone", value.phone||user.phone);
        }
        if (name === "whatsapp") {
          form.setValue("whatsapp", value.whatsapp||user.whatsapp);
        }
      });
      return () => subscription.unsubscribe();
    }, [form]);

  return (
    <Fragment>
        <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
      <Card className="bg-gaming-dark border-gaming-cyan/20">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
         
           <div className="space-y-2">
          <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={user.name}
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
            <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>numero</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={user.phone}
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
            </div>
            <div className="space-y-2">
                   <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>whatsapp</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={user.whatsapp}
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
          <div className="space-y-2">
              <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={user.email}
                            className="bg-gaming-dark/50 border-gaming-cyan/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

        </CardContent>
        <CardFooter>
           {isSubmitting ? (
                               <Loader/>
                             ) :(
                       <Button disabled={isSubmitting}
                         type="submit" 
                         className="w-full py-6 text-lg bg-gaming-cyan hover:bg-gaming-cyan/80 text-gaming-dark font-bold"
                       >
                         Edite Information
                       </Button>
                       )}
        </CardFooter>
      </Card>
          </form></Form>
    </Fragment>
  );
};
export default ProfileTab;
