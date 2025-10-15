"use client";
import { useState, useEffect, Fragment, Suspense ,FC} from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchOverlay from "@/components/layouts/searchOverlay";
import CartPanel from "@/components/cart/model";
import DesktopNavigation from "@/components/layouts/navbar/desktopNavigation";
import { Skeleton } from "@/components/ui/skeleton";
//import { UseGetCategories } from "@/lib/tanstack/useCategories";
import { Category  } from "@/lib/types/layouts";

import { MobileNavigation } from "./mobileNavigation";
import Logo from "./logo";
import IsAuthed from "./isAuthed";
type NavbarinterfaceProps = {
  isAuthed:boolean
  menu: Category[];
};
export  const Navbar: FC<NavbarinterfaceProps> = ({ isAuthed,menu }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoggedIn] = useState<boolean>(isAuthed);
  //? this for navbar color bg
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      {pathname === "/admin" ? null : (
        <header
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
            isScrolled
              ? "bg-gaming-dark/80  py-3 shadow-lg"
              : "bg-transparent py-5",
          )}
        >
          <div className="container mx-auto px-4 flex items-center justify-between">
            {/* Logo */}
            <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
              <Logo />
            </Suspense>
            {/* Desktop Navigation */}
            <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
              {menu ? <DesktopNavigation menu={menu} /> : null}
            </Suspense>
            {/* Action Items */}
            <div className="flex items-center space-x-4">
              <SearchOverlay />
              <CartPanel />

              {/* Login Button or User Dropdown */}
              <IsAuthed />
              {/* Mobile Menu */}
               {menu ? (
                <MobileNavigation isLoggedIn={isLoggedIn} menu={menu} />
              ) : null} 
            </div>
          </div>
        </header>
      )}
    </Fragment>
  );
}
export default Navbar