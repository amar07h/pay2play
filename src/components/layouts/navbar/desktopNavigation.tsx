import { MenuT } from "@/lib/types/layouts";
import { FC, Fragment } from "react";
import Link from "next/link";
type DesktopinterfaceProps = {
  menu: MenuT[];
};

const DesktopNavigation: FC<DesktopinterfaceProps> = ({ menu }) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {menu.length ? (
        <ul className="ml-8 hidden gap-6 text-xl font-bold md:flex md:items-center capitalize">
          {menu.map((item: MenuT) => (
            <Fragment key={item.title}>
              {item.ispublished ? (
                <li>
                  <Link
                    href={item.handle}
                    prefetch={true}
                    className="text-white animate-glow hover:text-gaming-cyan transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ) : null}
            </Fragment>
          ))}
        </ul>
      ) : null}
    </nav>
  );
};
export default DesktopNavigation;
