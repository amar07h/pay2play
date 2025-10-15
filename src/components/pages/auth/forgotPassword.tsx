"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import lang from "@/lang/auth.json";
import { toast } from "react-hot-toast";
import AuthLayout from "@/components/layouts/authLayouts";
import { Button } from "@/components/ui/button";
import { resetPasswordForEmail, SignUpResponse } from "./action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formSchemaEmail, FormValuesEmail } from "@/lib/validation/index";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValuesEmail>({
    resolver: zodResolver(formSchemaEmail),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormValuesEmail) {
    const responce: SignUpResponse = await resetPasswordForEmail(values.email);
    if (responce.success == true) {
      toast.success(lang.RestPwdTitleSuccess);
      // Navigate to home page after successful sign up
      setIsSubmitted(true);
    } else {
      toast.error(lang.RestPwdTitleFailed);
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll send you an email with a link to reset your password"
    >
      {!isSubmitted ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="bg-gaming-darker border-gaming-cyan/30 text-white placeholder:text-white/50 focus-visible:ring-gaming-cyan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-darker font-medium"
            >
              Send reset link
            </Button>
          </form>
        </Form>
      ) : (
        <div
          className={cn(
            "bg-gaming-darker/50 border border-gaming-cyan/20 rounded-lg p-6 text-center",
            "flex flex-col items-center mt-6",
          )}
        >
          <div className="bg-gaming-cyan/10 rounded-full p-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gaming-cyan"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Check your email
          </h3>
          <p className="text-white/70 text-sm mb-4">
            {
              "We've sent a password reset link to your email address. The link will expire in 10 minutes."
            }
          </p>
          <Button
            variant="outline"
            className="border-gaming-cyan/30 text-gaming-cyan hover:bg-gaming-cyan/10 mt-2"
            onClick={form.handleSubmit(onSubmit)}
          >
            Send again
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}
