"use client";
//? component for trend
import {FC} from "react";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { homeProduct } from "@/lib/types/products";

type NavbarinterfaceProps = {
  product: homeProduct[];
};
export const  featureProduct: FC<NavbarinterfaceProps> = ({ product }) => {

  return (
    <section className="py-4 px-4 relative overflow-hidden">
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

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-cyan/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-cyan/30 to-transparent"></div>

      <div className=" mx-auto z-10 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-gaming-cyan font-medium mb-2 inline-block">
              FEATURED PRODUCTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Top Gaming Gear
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-white hover:text-gaming-cyan mt-4 md:mt-0 group transition-colors"
          >
            View All Products
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {product.map((product) => (
            <ProductCard
              key={Math.random()}
              {...product}
              className="animate-fade-in"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default featureProduct