import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Google, signInWithFacebook } from "./action";
export default function SociaLogin() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="border-white/20 bg-white/5 hover:bg-white/10 capitalize text-white flex items-center justify-center gap-2"
        onClick={() => Google()}
      >
        <Image
          src={"/assets/google.png"}
          width={200}
          height={200}
          alt="google icon"
          className="h-6 w-6"
        />
        <span>google</span>
      </Button>
      <Button
        variant="outline"
        className="border-white/20 bg-white/5 hover:bg-white/10 capitalize text-white flex items-center justify-center gap-2"
        onClick={() => signInWithFacebook()}
      >
        <Image
          src={"/assets/facebook.png"}
          width={200}
          height={200}
          alt="facebook icon"
          className="h-6 w-6"
        />
        <span>facebook</span>
      </Button>
    </div>
  );
}
