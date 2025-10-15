import { SITE_NAME } from "@/app.config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        height={500}
        width={500}
        src="/logo.webp"
        alt="Gaming Store Logo"
        className="h-16 w-auto"
      />
      <span className="hidden sm:inline-block text-3xl font-bold leading-9 tracking-tight text-white text-center mb-2 animate-glow">
        {SITE_NAME}
      </span>
    </Link>
  );
}
