"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Lock } from "lucide-react";
import lang from "@/lang/auth.json";

import { FormValuesUpdate, formSchemaUpdate } from "@/lib/validation/index";
import AuthLayout from "@/components/layouts/authLayouts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { updatePassword, SignUpResponse } from "./action";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValuesUpdate>({
    resolver: zodResolver(formSchemaUpdate),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValuesUpdate) {
    const responce: SignUpResponse = await updatePassword(values.password);
    if (responce.success == false) {
      toast.error(lang.FailedRegisterTitle, {
        duration: 7000,
      });
    } else {
      toast.success(lang.SuccessUpdateTitle);
      // Navigate to sign-in page after successful password reset
      setTimeout(() => {
        redirect("/");
      }, 2000);
    }
  }

  return (
    <AuthLayout
      title="Set your new password"
      subtitle="Create a strong password for your account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gaming-cyan/10 rounded-full p-4">
              <Lock className="h-8 w-8 text-gaming-cyan" />
            </div>
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="bg-gaming-darker border-gaming-cyan/30 text-white placeholder:text-white/50 focus-visible:ring-gaming-cyan pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-white/70 hover:text-white hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      className="bg-gaming-darker border-gaming-cyan/30 text-white placeholder:text-white/50 focus-visible:ring-gaming-cyan pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-white/70 hover:text-white hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Hide password"
                          : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-darker font-medium"
          >
            Set New Password
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ResetPassword;
