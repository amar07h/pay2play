"use client";
import { PlusIcon, ShoppingCart } from "lucide-react";
import clsx from "clsx";
import { useProduct } from "@/context/product.context";
import { SingelProductModel, ProductVariant } from "@/lib/types/products";
import { useCart } from "@/context/cart-context";
import { Button } from "../ui/button";
function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-gaming-cyan/20 text-primary p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <Button className="flex-1 h-12 bg-gaming-cyan text-gaming-dark hover:bg-white gap-2 text-base animate-pulse-glow">
      <ShoppingCart size={18} />
      Add To Cart
    </Button>
  );
}

export function AddToCart({ product }: { product: SingelProductModel }) {
  const { product_variants, available_for_sale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();

  const variant = product_variants.find((variant: ProductVariant) =>
    variant.variant_selected_options.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );
  const defaultVariantId =
    product_variants.length === 1 ? product_variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = product_variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
      }}
    >
      <SubmitButton
        availableForSale={available_for_sale}
        selectedVariantId={selectedVariantId}
      />

      <p aria-live="polite" className="sr-only" role="status">
        {"error 504"}
      </p>
    </form>
  );
}
