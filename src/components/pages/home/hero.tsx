"use client";
import { Fragment, useEffect, useRef, Suspense,FC } from "react";
import EmblaCarousel from './EmblaCarousel'

type NavbarinterfaceProps = {
  product: string[];
};
export const Hero: FC<NavbarinterfaceProps> = ({ product }) =>{
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();

      // Calculate the movement of the parallax effect (subtle)
      const x = ((clientX - left - width / 2) / width) * 15;
      const y = ((clientY - top - height / 2) / height) * 15;

      // Apply the transformation to the background
      heroRef.current.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Fragment>
      <Suspense fallback={"please try again later"}>
        <div
          ref={heroRef}
          className="h-auto flex items-center justify-center px-4 md:px-8 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(13, 17, 23, 0.7) 0%, rgba(7, 10, 15, 0.95) 100%)",
          }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #00E6FF 1px, transparent 1px), linear-gradient(to bottom, #00E6FF 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                backgroundPosition: "center center",
              }}
            ></div>
          </div>

          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gaming-cyan/5 filter blur-[100px] animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gaming-cyan/10 filter blur-[80px] animate-pulse-glow animation-delay-1000"></div>

          <div className="container h-auto mx-auto items-center z-10">
            {/* Hero content */}
              <EmblaCarousel slides={product} />

          </div>

         
        </div>
      </Suspense>
    </Fragment>
  );
}
export default Hero