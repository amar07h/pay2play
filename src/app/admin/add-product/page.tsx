import AddProduct from "@/components/pages/admin/products/add products/index";
import { IsUser } from "@/lib/superbase/server";

export default async function Page() {
  const user = await IsUser();
  if (user && user.email == "skizoodev@gmail.com") {
    return <AddProduct />;
  }
}
