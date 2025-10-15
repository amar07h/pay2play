import Profile from "@/components/pages/user/index";
import { IsUser } from "@/lib/superbase/server";
export default async function page() {
    const user = await IsUser();

    if(!user) {
        return <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Please login to view your profile</h1>
        </div>;
    }
    const profile = {
      name:user.user_metadata.name,
      email:user.user_metadata.email,
      phone:user.user_metadata.phone,
      whatsapp:user.user_metadata.whatsapp,
      avatar:user.user_metadata.avatar_url,
      created_at:user.created_at,
      order:5,
    };
  return <Profile profile={profile}/>;
}
