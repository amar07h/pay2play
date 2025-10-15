import React from "react";
import { Button } from "@/components/ui/button";

interface Option {
  id: number;
  name: string;
  price: number | null;
}

interface ProductOptionsProps {
  title: string;
  options: Option[];
  selectedOption: number | null;
  onSelect: (optionId: number) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  title,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-white text-lg font-medium mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <Button
            key={option.id}
            variant={selectedOption === option.id ? "default" : "outline"}
            className={`
              h-auto py-2 px-4 transition-all duration-300 
              ${
                selectedOption === option.id
                  ? "bg-gaming-cyan text-gaming-dark"
                  : "border-gaming-cyan/30 text-white hover:border-gaming-cyan hover:text-gaming-cyan"
              }
              ${selectedOption === option.id ? "animate-pulse-glow" : ""}
            `}
            onClick={() => onSelect(option.id)}
          >
            {option.name}
            {option.price !== null && option.price > 0 && (
              <span className="ml-1 text-xs">
                (+${option.price.toFixed(3)})
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductOptions;
