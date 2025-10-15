"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2022 + (currentYear > 2023 ? `-${currentYear}` : "");
  const COMPANY_NAME = "Game Store";

  return (
    <footer className="relative overflow-hidden bg-gaming-darker">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-cyan/30 to-transparent"></div>

      {/* Background elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, #00E6FF 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "center center",
        }}
      ></div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                height={500}
                width={500}
                src="/logo.webp"
                alt="Gaming Store Logo"
                className="h-8 w-auto mr-2"
              />
              <span className="text-xl font-bold text-white">
                {COMPANY_NAME}
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium gaming equipment, accessories, and merchandise designed
              for professional gamers and enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-cyan transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-cyan transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-cyan transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-cyan transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gaming-cyan transition-colors"
              >
                <Twitch size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-gaming-cyan transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-gaming-cyan mt-1 mr-3 flex-shrink-0"
                />
                <span className="text-gray-400">
                  3la 9rib nchlh fi 88 rue oran medina jedida ben arous
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={18}
                  className="text-gaming-cyan mr-3 flex-shrink-0"
                />
                <span className="text-gray-400">+216 29 557 914</span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={18}
                  className="text-gaming-cyan mr-3 flex-shrink-0"
                />
                <span className="text-gray-400">gamingstore41@gmail.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-2">
                Subscribe to Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gaming-dark border border-gray-700 text-gray-300 px-3 py-2 text-sm rounded-l-md focus:outline-none focus:border-gaming-cyan flex-grow"
                />
                <button className="bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-darker font-semibold px-4 py-2 text-sm rounded-r-md transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {copyrightDate} {COMPANY_NAME}
            {COMPANY_NAME.length && !COMPANY_NAME.endsWith(".") ? "." : ""} All
            rights reserved.
          </p>
          <div className="flex space-x-4">
            {/*   <Image src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="https://cdn-icons-png.flaticon.com/512/196/196581.png" alt="MasterCard" className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" />
    */}{" "}
          </div>
        </div>
      </div>
    </footer>
  );
}
