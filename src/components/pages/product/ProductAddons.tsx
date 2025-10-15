import { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface Addon {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductAddonsProps {
  addons: Addon[];
  selectedAddons: number[];
  onToggleAddon: (addonId: number) => void;
}

const ProductAddons: FC<ProductAddonsProps> = ({
  addons,
  selectedAddons,
  onToggleAddon,
}) => {
  return (
    <div className="mb-6 gaming-card p-4 rounded-lg animate-fade-in">
      <h3 className="text-white text-lg font-medium mb-4">
        Recommended Add-ons
      </h3>

      <div className="space-y-3">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={`
              flex items-start space-x-3 p-3 rounded-lg transition-all duration-300
              ${selectedAddons.includes(addon.id) ? "bg-gaming-cyan/10" : "hover:bg-gaming-darker"}
            `}
          >
            <Checkbox
              id={`addon-${addon.id}`}
              checked={selectedAddons.includes(addon.id)}
              onCheckedChange={() => onToggleAddon(addon.id)}
              className="border-gaming-cyan data-[state=checked]:bg-gaming-cyan data-[state=checked]:text-gaming-dark mt-1"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <Label
                  htmlFor={`addon-${addon.id}`}
                  className="text-white font-medium cursor-pointer"
                >
                  {addon.name}
                </Label>
                <span className="text-gaming-cyan font-medium">
                  +${addon.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{addon.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAddons;
