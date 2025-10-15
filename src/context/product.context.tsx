"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useMemo,
  startTransition,
  useOptimistic,
  useCallback,
  useState,
} from "react";
import { ProductVariant } from "@/lib/types/products";
type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};
type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => ProductState;
  updateImage: (index: string) => ProductState;
  selectedVariant: ProductVariant | null;
  setSelectedVariant: (variant: ProductVariant | null) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update,
    }),
  );
  const updateOption = useCallback(
    (name: string, value: string) => {
      const newState = { [name]: value };
      startTransition(() => {
        setOptimisticState(newState);
      });
      return { ...state, ...newState };
    },
    [setOptimisticState],
  );

  const updateImage = useCallback(
    (index: string) => {
      const newState = { image: index };
      startTransition(() => {
        setOptimisticState(newState);
      });
      return { ...state, ...newState };
    },
    [setOptimisticState],
  );

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage,
      setSelectedVariant,
      selectedVariant,
    }),
    [state, updateImage, updateOption, selectedVariant],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
