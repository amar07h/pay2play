import { NextResponse } from "next/server";
import {CheckUser} from "@/lib/superbase/server"
import {verify} from "jsonwebtoken"
import { cookies } from "next/headers";
import {JWT_SECRET} from "@/app.config"
export async function GET() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('userSession')
    if(!hasCookie){
  const supabase = await CheckUser();
  if (!supabase.info) return NextResponse.json({ loggedIn: false });
    const Token=verify(supabase.info,JWT_SECRET)
  const parse={
    user:Token,
    authed:supabase.auth
  }
    cookieStore.set({
    name: "userSession",
    value: JSON.stringify(parse),
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });
  return NextResponse.json({ loggedIn: supabase.auth });
    }
      const info = cookieStore.get('userSession')?.value
      console.log(info)
        if (!info) return NextResponse.json({ loggedIn: false });

    const infos=JSON.parse(info)
      return NextResponse.json({ loggedIn: infos.authed });
}