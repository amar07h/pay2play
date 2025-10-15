import React from 'react';
import { ArrowRight, Clock, Zap } from 'lucide-react';

const DealsBanner: React.FC = () => {
  
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-gaming-dark to-gaming-darker relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-gaming-cyan/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gaming-cyan/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Deal content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Zap className="text-gaming-cyan w-6 h-6" />
              <span className="text-gaming-cyan font-semibold text-sm tracking-wider uppercase">
                Limited Time Offer
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-gaming-cyan">50% OFF</span>
              <br />
              Gaming Peripherals
            </h2>
            
            <p className="text-gray-300 text-lg mb-6 max-w-md mx-auto lg:mx-0">
              Upgrade your setup with premium keyboards, mice, and headsets. 
              Professional-grade equipment at unbeatable prices.
            </p>
            
            {/* Countdown timer */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <Clock className="text-gaming-cyan w-5 h-5" />
              <div className="flex gap-2 text-white font-mono">
                <div className="bg-gaming-cyan/20 px-3 py-1 rounded border border-gaming-cyan/30">
                  <span className="text-gaming-cyan font-bold">12</span>
                  <div className="text-xs text-gray-400">DAYS</div>
                </div>
                <div className="bg-gaming-cyan/20 px-3 py-1 rounded border border-gaming-cyan/30">
                  <span className="text-gaming-cyan font-bold">18</span>
                  <div className="text-xs text-gray-400">HRS</div>
                </div>
                <div className="bg-gaming-cyan/20 px-3 py-1 rounded border border-gaming-cyan/30">
                  <span className="text-gaming-cyan font-bold">42</span>
                  <div className="text-xs text-gray-400">MIN</div>
                </div>
              </div>
            </div>
            
            <button className="bg-gaming-cyan hover:bg-gaming-cyan/90 text-gaming-dark px-8 py-3 rounded-lg font-semibold flex items-center gap-3 mx-auto lg:mx-0 transition-all duration-300 hover:gap-4 group">
              Shop Deals Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          {/* Right side - Product showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main featured product */}
              <div className="col-span-2 gaming-card p-6 hover:gaming-glow transition-all duration-300">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&h=300&fit=crop"
                    alt="Gaming Setup"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    -50%
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-2">Premium Gaming Bundle</h3>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">$299.99</span>
                  <span className="text-gaming-cyan font-bold text-lg">$149.99</span>
                </div>
              </div>
              
              {/* Secondary products */}
              <div className="gaming-card p-4 hover:gaming-glow transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop"
                  alt="Gaming Mouse"
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <h4 className="text-white text-sm font-medium mb-1">Pro Gaming Mouse</h4>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-gray-400 line-through">$79.99</span>
                  <span className="text-gaming-cyan font-bold">$39.99</span>
                </div>
              </div>
              
              <div className="gaming-card p-4 hover:gaming-glow transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop"
                  alt="Gaming Headset"
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <h4 className="text-white text-sm font-medium mb-1">Gaming Headset</h4>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-gray-400 line-through">$129.99</span>
                  <span className="text-gaming-cyan font-bold">$64.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsBanner;