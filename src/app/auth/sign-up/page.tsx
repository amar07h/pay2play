import { IsUser } from "@/lib/superbase/server";
import { redirect } from "next/navigation";
import RegisterPage from "@/components/pages/auth/register";
export default async function page() {
  const user = await IsUser();
  if (user) {
    redirect("/");
  }
  return <RegisterPage />;
}
