/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/types/cart";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const merchandiseId = item.merchandise.id;

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, "delete");
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full"
      >
        <Trash2 className="mx-[1px] text-white hover:text-red-500 " size={24} />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {"error with deleting data"}
      </p>
    </form>
  );
}
