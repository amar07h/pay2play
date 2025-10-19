"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageView } from "@/lib/fbpixel";

export  function ClientTracking() {
  const pathname = usePathname();

  useEffect(() => {
    pageView();
  }, [pathname]);

  return null;
}