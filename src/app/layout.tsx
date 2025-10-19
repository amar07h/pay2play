"use server";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layouts/navbar/navbar";
import Footer from "@/components/layouts/footer";
import { Toaster } from "react-hot-toast";
import './globals.css';
import { CartProvider } from "@/context/cart-context";
import { GetCategories } from "@/lib/superbase/categories";
import { Category  } from "@/lib/types/layouts";
import { StrictMode } from "react";
import { cookies } from "next/headers";
import Head from "next/head";
import Script from "next/script";
import { ClientTracking } from "@/components/layouts/pixelLayout";
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
          {/* Meta Pixel */}
   <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3255985564553656');
              fbq('track', 'PageView');
            `
          }}
        />

        <ClientTracking />
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
