import React from "react";
import Link from "next/link";
import { ShieldX, AlertTriangle } from "lucide-react";
import "./unauthrized.css";
const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-darker p-6">
      <div className="box-of-star1">
        <div className="star star-position1" />
        <div className="star star-position2" />
        <div className="star star-position3" />
        <div className="star star-position4" />
        <div className="star star-position5" />
        <div className="star star-position6" />
        <div className="star star-position7" />
      </div>
      <div className="box-of-star2">
        <div className="star star-position1" />
        <div className="star star-position2" />
        <div className="star star-position3" />
        <div className="star star-position4" />
        <div className="star star-position5" />
        <div className="star star-position6" />
        <div className="star star-position7" />
      </div>
      <div className="box-of-star3">
        <div className="star star-position1" />
        <div className="star star-position2" />
        <div className="star star-position3" />
        <div className="star star-position4" />
        <div className="star star-position5" />
        <div className="star star-position6" />
        <div className="star star-position7" />
      </div>
      <div className="box-of-star4">
        <div className="star star-position1" />
        <div className="star star-position2" />
        <div className="star star-position3" />
        <div className="star star-position4" />
        <div className="star star-position5" />
        <div className="star star-position6" />
        <div className="star star-position7" />
      </div>
      <div className="max-w-xl w-full text-center">
        <div className="relative mb-20">
          <div>
            <div data-js="astro" className="astronaut">
              <div className="head" />
              <div className="arm arm-left" />
              <div className="arm arm-right" />
              <div className="body">
                <div className="panel" />
              </div>
              <div className="leg leg-left" />
              <div className="leg leg-right" />
              <div className="schoolbag" />
            </div>
          </div>
        </div>

        <div className="glass-effect p-8 rounded-xl mt-20  border-gaming-cyan/20 shadow-lg shadow-gaming-cyan/5">
          <div className="flex justify-center mb-6">
            <ShieldX size={64} className="text-red-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/70 mb-6">
            {
              "You don't have permission to access this area. Please log in with the correct credentials or contact an administrator."
            }
          </p>

          <div className="grid gap-4 mb-6">
            <div className="bg-gaming-dark/60 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" />
                <p className="text-white/60 text-sm text-left">
                  <span className="text-red-400 font-medium block mb-1">
                    Unauthorized Access
                  </span>
                  This page requires elevated permissions or authentication to
                  view.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-in"
              className="bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-darker py-2 px-6 rounded-md font-medium transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/"
              className="border border-gaming-cyan/30 text-gaming-cyan hover:bg-gaming-cyan/10 py-2 px-6 rounded-md transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
