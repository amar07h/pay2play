'use client';
import ProductCard from "@/components/ui/ProductCard";
import { Fragment, useEffect, useState } from 'react';
import{ homeProduct } from '@/lib/types/products';
export default function RecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<homeProduct[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(items);
  }, []);

  return (
    <Fragment>
      {recentlyViewed.length === 0 ? (
                null
            ) : 

   <section className="py-20 px-4 relative overflow-hidden">
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

      <div className="container mx-auto z-10 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-gaming-cyan font-medium mb-2 inline-block">
              Recently Viewed
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              products visted recently
            </h2>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.length === 0 ? (
                <div className="col-span-4 text-center text-gray-500">
                No recently viewed products.
                </div>
            ) : (
                recentlyViewed.map((product) => (
                <ProductCard
                    key={Math.random()}                   
                    {...product}
                    className="animate-fade-in"
                />
                ))
            )}
        </div>
      </div>
    </section>
      }
    </Fragment>
  );
}
