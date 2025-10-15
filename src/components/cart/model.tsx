"use client"
import { useEffect, useState, useRef, Fragment } from "react";
import { X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { createUrl } from "@/lib/utils";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { DeleteItemButton } from "./delete-item-button";
import { S3_ENDPOINT } from "@/app.config";
import {createCartAndSetCookie} from "@/components/cart/actions"
type MerchandiseSearchParams = {
  [key: string]: string;
};
export default function CartPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const { cart, updateCartItem } = useCart();
  const quantityRef = useRef(cart?.totalQuantity);
    useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);
  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    const handleClickOutside = (e: MouseEvent) => {
      const panel = document.getElementById("cart-panel");
      if (panel && !panel.contains(e.target as Node) && isOpen) {
        closeCart();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Calculate cart totals
    const subtotal = cart?.lines.reduce((sum, item) => sum + parseInt(item.cost.totalAmount.amount),0)||0
  /* const taxRate = 0.08; // 8% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax; */

  return (
    <>
      <button
        className="text-white hover:text-gaming-cyan transition-colors relative"
        onClick={openCart}
        aria-label="Shopping Cart"
      >
        <ShoppingCart size={20} />
        <span className="absolute -top-2 -right-2 bg-gaming-cyan text-gaming-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cart?.lines.length}
        </span>
      </button>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div
        id="cart-panel"
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-gaming-dark border-l border-gaming-cyan/20 shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="py-4 px-6 border-b border-gaming-cyan/20 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ShoppingCart size={20} className="mr-2 text-gaming-cyan" />
              Your Cart is {cart?.lines.length}
            </h2>
            <button
              className="text-white hover:text-gaming-cyan transition-colors"
              onClick={closeCart}
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4 px-6">
            {!cart || cart.lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <ShoppingCart size={48} className="text-gaming-cyan/30 mb-4" />
                <p className="text-white mb-4">Your cart is empty</p>
                <button
                  className="px-4 py-2 bg-gaming-cyan text-gaming-dark font-medium rounded-md hover:bg-gaming-cyan/80 transition-colors"
                  onClick={closeCart}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.lines
                  .sort((a, b) =>
                    a.merchandise.product.title.localeCompare(
                      b.merchandise.product.title,
                    ),
                  )
                  .map((item, i) => {
                    const merchandiseSearchParams =
                      {} as MerchandiseSearchParams;

                    const merchandiseUrl = createUrl(
                      `/product/${item.merchandise.product.handle}`,
                      new URLSearchParams(merchandiseSearchParams),
                    );
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-gaming-darker/40 transition-colors"
                      >
                        <div className="h-16 w-16 bg-gaming-darker rounded-md overflow-hidden">
                          <Image
                            className="h-full w-full object-cover"
                            height={500}
                            width={500}
                            alt={
                              item.merchandise.product.featuredImage.altText ||
                              item.merchandise.product.title
                            }
                            priority
                            src={
                              S3_ENDPOINT +
                              item.merchandise.product.featuredImage
                            }
                          />
                        </div>
                        <Fragment>
                        
                          <div className="flex-1 min-w-0">
                            <Link
                          href={merchandiseUrl}
                          onClick={closeCart}
                          className="z-30 ml-2 flex flex-row space-x-4"
                        >
                            <h3 className="text-white font-medium truncate">
                              {item.merchandise.product.title}
                            </h3>
                            <p className="text-gaming-cyan">
                              {parseFloat(item.cost.totalAmount.amount).toFixed(
                                3
                              )}
                            </p>
                              </Link>
                            <div className="flex items-center mt-1">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                                optimisticUpdate={updateCartItem}
                              />
                              <span className="mx-2 text-white">
                                {item.quantity}
                              </span>
                              <EditItemQuantityButton
                                item={item}
                                type="plus"
                                optimisticUpdate={updateCartItem}
                              />
                            </div>
                          </div>
                        </Fragment>
                        <DeleteItemButton
                          item={item}
                          optimisticUpdate={updateCartItem}
                        />
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>

          {/* Cart Summary */}
          {cart && cart?.lines.length > 0 && (
            <div className="py-4 px-6 border-t border-gaming-cyan/20">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-white font-bold pt-2 border-t border-gaming-cyan/20">
                  <span>Total</span>
                  <span className="uppercase text-gaming-cyan">
                    {subtotal?.toFixed(3)||0}{cart.cost.totalAmount.currencyCode}
                  </span>
                </div>
              </div>

              <div className="space-y-2">

                <Link
                  href={`/checkout/${cart.id}`}
                  className="block w-full py-3 px-4 bg-gaming-cyan text-gaming-dark font-medium text-center rounded-md hover:bg-gaming-cyan/80 transition-colors"
                  onClick={closeCart}
                >
                  Checkout
                </Link>
                <button
                  className="block w-full py-3 px-4 bg-transparent text-white border border-gaming-cyan/50 font-medium text-center rounded-md hover:bg-gaming-darker transition-colors"
                  onClick={closeCart}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
