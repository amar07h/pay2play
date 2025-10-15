import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/common";
interface User {
   name: string,
    email: string, 
    phone: string,
    whatsapp: string, 
    avatar: string,
    created_at: string,
}
interface UserProps {
  user: User;
}
const ProfileCard: React.FC<UserProps> = ({ user }) => {
  return (
    <Card className="w-full md:w-1/3 bg-gaming-dark border-gaming-cyan/20">
      <CardHeader>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gaming-cyan mb-4">
            <Image 
              src={user.avatar}
              width={500} height={500}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-xl text-white">{user.name}</CardTitle>
          <CardDescription className="text-gray-400">
            {user.email}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-300">{formatDate(user.created_at)}</p>
          <p className="text-sm text-gray-300">{"user.order"}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="outline"
          className="border-gaming-cyan text-gaming-cyan hover:bg-gaming-cyan/10"
        >
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ProfileCard;
