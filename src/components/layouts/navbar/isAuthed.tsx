import { SignOut } from "@/components/pages/auth/action";
import { Button } from "@/components/ui/button";
import { MenuT } from "@/lib/types/layouts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { User, LogIn } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
const DropDownMenu: MenuT[] = [
  {
    title: "My Profile",
    handle: "/profile",
    ispublished: true,
  },
  {
    title: "My Orders",
    handle: "/profile",
    ispublished: true,
  },
  {
    title: "My whislist",
    handle: "/profile",
    ispublished: true,
  },
];


const IsAuthed = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("/api/authed");
      const data = await res.json();
      setIsLoggedIn(data.loggedIn);
    };

    checkUser();
  }, []);

  if (isLoggedIn === null) return <p>...</p>;  return (
    <Fragment>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-white hover:text-gaming-cyan transition-colors hidden md:flex items-center space-x-2">
              <User size={32} />
              <span className="text-lg">Profile</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-gaming-dark border-gaming-cyan/30 text-white  text-center"
          >
            {DropDownMenu.length ? (
              <Fragment>
                {DropDownMenu.map((item: MenuT) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="hover:bg-gaming-darker text-lg hover:text-gaming-cyan cursor-pointer"
                  >
                    <Link href={item.handle} className="w-full">
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </Fragment>
            ) : null}
            <DropdownMenuSeparator className="bg-gaming-cyan/20" />
            <DropdownMenuItem className="w-full hover:bg-gaming-darker text-lg text-center hover:text-gaming-cyan cursor-pointer">
              <Button onClick={() => SignOut()}>Sign Out</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button className="text-white bg-gaming-cyan/90 hover:bg-gaming-cyan px-4 py-2 rounded-md transition-colors hidden md:flex md:justify-between items-center">
          <LogIn size={32} />

          <Link href="/auth/sign-in" prefetch={true}>
            <span className="text-sm font-medium ml-2">login</span>
          </Link>
        </button>
      )}
    </Fragment>
  );
};
export default IsAuthed;
