import React from "react";
import LoginPage from "@/components/pages/auth/login";
import { IsUser } from "@/lib/superbase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await IsUser();
  if (user) {
    redirect("/");
  }
  return <LoginPage />;
}
