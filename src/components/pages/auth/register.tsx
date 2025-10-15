"use client";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import lang from "@/lang/auth.json";
import { signUpNewUser, SignUpResponse } from "./action";
import SociaLogin from "./social-login";
import { formSchema, FormValues } from "@/lib/validation/index";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });
  async function onSubmit(values: FormValues) {
    const responce: SignUpResponse = await signUpNewUser(
      values.email,
      values.password,
    );
    if (responce.success == false) {
      toast.error(lang.FailedRegisterTitle);
    } else {
      toast.success(lang.SuccessRegisterTitle);
      // Navigate to home page after successful sign up
      setTimeout(() => {
        redirect("/");
      }, 1500);
    }
  }
  return (
    <AuthLayout title="Create an account" subtitle="Join our gaming community">
      <div className="space-y-6">
        {/* Social Login Buttons */}
        <SociaLogin />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gaming-darker px-2 text-white/50">
              or sign up with email
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Foulen@example.com"
                      type="email"
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
                        autoComplete="true"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="bg-gaming-darker/60 border-gaming-cyan/30 text-white placeholder:text-white/50 focus-visible:ring-gaming-cyan pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-gaming-cyan"
                        onClick={() => setShowPassword(!showPassword)}
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="bg-gaming-darker/60 border-gaming-cyan/30 text-white placeholder:text-white/50 focus-visible:ring-gaming-cyan pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-gaming-cyan"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
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

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-gaming-cyan data-[state=checked]:border-gaming-cyan mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-white/70">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-gaming-cyan hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-gaming-cyan hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-6 bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-darker font-medium"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Create account
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-white/70">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-gaming-cyan hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
