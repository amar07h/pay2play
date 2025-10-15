import CheckoutPage from "@/components/pages/checkout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
    const info = (await cookies()).get('userSession')?.value;
            if (!info) redirect('/auth/sign-in?redirect=/checkout/'+(await props.params).slug);
        const infos=JSON.parse(info)

    const params = (await props.params).slug;

  return <CheckoutPage cartid={params} info={infos} />;
}
