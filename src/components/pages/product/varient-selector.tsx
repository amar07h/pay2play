"use client";
import { useProduct, useUpdateURL } from "@/context/product.context";
import { ProductOption, ProductVariant } from "@/lib/types/products";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import clsx from "clsx";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.available_for_sale,
    ...variant.variant_selected_options.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  return (
    <div className="space-y-6">
      {options.map((option) => {
        const optionNameLowerCase = option.name.toLowerCase();

        return (
          <div key={option.id} className="mb-6">
            <h3 className="text-white text-lg font-medium mb-3">
              Choose {option.name}
            </h3>
            <Select
              value={state[optionNameLowerCase]}
              onValueChange={(value) => {
                const newState = updateOption(optionNameLowerCase, value);
                updateURL(newState);
              }}
            >
              <SelectTrigger className="w-full bg-gaming-dark border-gaming-cyan/30 text-white">
                <SelectValue placeholder={`Select a ${option.name}`} />
              </SelectTrigger>
              <SelectContent className="bg-gaming-dark border-gaming-cyan/30 text-white">
                {option.values.map((value) => {
                  const optionParams = {
                    ...state,
                    [optionNameLowerCase]: value,
                  };
                  const filtered = Object.entries(optionParams).filter(
                    ([key, value]) =>
                      options.find(
                        (option) =>
                          option.name.toLowerCase() === key &&
                          option.values.includes(value),
                      ),
                  );
                  const isAvailableForSale = combinations.find((combination) =>
                    filtered.every(
                      ([key, value]) =>
                        combination[key] === value &&
                        combination.availableForSale,
                    ),
                  );

                  return (
                    <SelectItem
                      key={value}
                      value={value}
                      disabled={!isAvailableForSale}
                      className={clsx(
                        "hover:bg-gaming-cyan/20 focus:bg-gaming-cyan/20 focus:text-primary",
                        {
                          "opacity-50 cursor-not-allowed": !isAvailableForSale,
                        },
                      )}
                    >
                      <span className="flex justify-between w-full">
                        <span>{value}</span>
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
}
