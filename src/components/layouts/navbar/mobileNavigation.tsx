"use client";
import { FC, useState, Fragment } from "react";
import { MenuT } from "@/lib/types/layouts";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn } from "lucide-react";

type DesktopinterfaceProps = {
  menu: MenuT[];
  isLoggedIn: boolean;
};

export const MobileNavigation: FC<DesktopinterfaceProps> = ({ menu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Fragment>
      <button
        className="text-white hover:text-gaming-cyan transition-colors md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>
      <div
        className={cn(
          "fixed inset-0 bg-gaming-darker/95  z-40 flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          className="text-white hover:text-gaming-cyan flex justify-end transition-colors md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
        <nav className="flex flex-col space-y-6 items-center text-xl">
          {menu.length ? (
            <ul className="flex flex-col space-y-6 items-center text-xl capitalize font-bold">
              {menu.map((item: MenuT) => (
                <Fragment key={item.title}>
                  {item.ispublished ? (
                    <li>
                      <Link
                        href={item.handle}
                        prefetch={true}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white hover:text-gaming-cyan transition-colors py-2 w-full text-center border-b border-gaming-cyan/20"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ) : null}
                </Fragment>
              ))}
            </ul>
          ) : null}

          {/* Mobile sign in button */}
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:text-gaming-cyan transition-colors py-2 w-full text-center border-b border-gaming-cyan/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Profile
              </Link>
              <button
                className="text-white hover:text-gaming-cyan transition-colors py-2 w-full text-center border-b border-gaming-cyan/20"
                onClick={() => {
                  setIsLoggedIn(false);
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="bg-gaming-cyan/90 hover:bg-gaming-cyan text-white py-3 w-full rounded-md flex justify-center items-center space-x-2"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <LogIn size={18} />

              <Link href="/auth/sign-in" prefetch={true}>
                <span className="text-xl font-bold capitalize">login</span>
              </Link>
            </button>
          )}
        </nav>
      </div>
    </Fragment>
  );
};
