"use server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar/navbar";
import Footer from "@/components/layouts/footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/cart-context";
import { GetCategories } from "@/lib/superbase/categories";
import { Category  } from "@/lib/types/layouts";
import { StrictMode } from "react";
import { cookies } from "next/headers";
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const responce:Category[]= await GetCategories();

const cartId = (await cookies()).get('cartId')?.value;
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>GameStore</title>
        <meta name="description" content="GameStore" />
        <meta name="keywords" content="GameStore, games, shop, buy games,free fire, mastercard,mobile legend" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="GameStore" />
        <meta property="og:description" content="GameStore" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GameStore" />
        <meta name="twitter:description" content="GameStore" />
        <meta name="twitter:image" content="/twitter-image.jpg" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StrictMode>
              <CartProvider cartId={cartId}>            
              { responce.length > 0 ?
                <Navbar menu={responce} isAuthed={false}/>:null
                }
                {children}
                </CartProvider>
              <Footer />
        </StrictMode>
        <Toaster />
      </body>
    </html>
  );
}
