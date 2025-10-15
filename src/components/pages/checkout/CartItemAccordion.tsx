import React from "react";
import Image from "next/image";
import {S3_ENDPOINT} from "@/app.config"
import {EditItemQuantityButton} from "@/components/cart/edit-item-quantity-button"
import {DeleteItemButton} from "@/components/cart/delete-item-button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {CartItem} from "@/lib/types/cart"
import { useCart } from "@/context/cart-context";


interface CartItemAccordionProps {
  items: CartItem[];
}

const CartItemAccordion: React.FC<CartItemAccordionProps> = ({ items }) => {
    const {  updateCartItem } = useCart();

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="items"
      className="border rounded-md border-gaming-cyan/20 overflow-hidden"
    >
      <AccordionItem value="items" className="border-b-0">
        <AccordionTrigger className="py-3 px-4 hover:bg-gaming-dark/40 hover:no-underline bg-gaming-dark/20 group">
          <div className="flex items-center justify-between w-full h-12">
            <span className="font-medium">Votre Panier ({items.length})</span>
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              Subtotal:
              {items
                .reduce((sum, item) => sum +parseInt( item.cost.totalAmount.amount), 0)
                .toFixed(3)}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-0 animate-accordion-down">
          <div className="divide-y divide-gaming-cyan/10">
            {items.map((item) => (
              <div
                key={Math.random()}
                className="p-4 flex items-center space-x-4 hover:bg-gaming-dark/30 transition-colors"
              >
                <div className="w-16 h-16 bg-gaming-dark rounded-md overflow-hidden flex-shrink-0">
                  
                  <Image
                    src={S3_ENDPOINT+item.merchandise.product.featuredImage}
                    alt={item.merchandise.product.title}
                    width={500} height={500}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="font-medium">{item.merchandise.product.title}</h3>
                  <p className="text-gaming-cyan mt-1 uppercase">
                    {parseInt(item.cost.totalAmount.amount).toFixed(3)}{item.cost.totalAmount.currencyCode}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                   <EditItemQuantityButton
                                item={item}
                                type="minus"
                                optimisticUpdate={updateCartItem}
                              />
                  <span className="w-6 text-center">{item.quantity}</span>
               <EditItemQuantityButton
                                item={item}
                                type="plus"
                                optimisticUpdate={updateCartItem}
                              />
                </div>

                 <DeleteItemButton
                          item={item}
                          optimisticUpdate={updateCartItem}
                        />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CartItemAccordion;
