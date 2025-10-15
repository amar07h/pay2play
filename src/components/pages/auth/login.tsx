"use client";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { signInWithPassword, SignUpResponse } from "./action";
import AuthLayout from "@/components/layouts/authLayouts";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import lang from "@/lang/auth.json";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SociaLogin from "./social-login";
import { FormValuesLogin, formSchemalogin } from "@/lib/validation/index";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormValuesLogin>({
    resolver: zodResolver(formSchemalogin),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: FormValuesLogin) {
    const responce: SignUpResponse = await signInWithPassword(
      values.email,
      values.password,
    );
    if (responce.success == false) {
      toast.error(lang.FailedRegisterTitle);
    } else {
      toast.success(lang.SuccessRegisterTitle);
      setTimeout(() => {
        redirect("/");
      }, 1500);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back, let's get you back into the game"
    >
      <div className="space-y-6">
        {/* Social Login Buttons */}
        <SociaLogin />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gaming-darker px-2 text-white/50">
              or continue with email
            </span>
          </div>
        </div>

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
                      className="bg-gaming-darker/60 border-gaming-cyan/30 text-white placeholder:text-white/50 focus-visible:ring-gaming-cyan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-gaming-darker/60 border-gaming-cyan/30 text-white placeholder:text-white/50 focus-visible:ring-gaming-cyan pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-gaming-cyan"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gaming-cyan data-[state=checked]:border-gaming-cyan"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-white/70 cursor-pointer">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Link
                href="/auth/forgot-password"
                prefetch={true}
                target="_self"
                className="text-sm text-gaming-cyan hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-darker font-medium"
            >
              <LogIn className="mr-2 h-4 w-4" /> Sign in
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-white/70">
          {"    Don't have an account? "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-gaming-cyan hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
