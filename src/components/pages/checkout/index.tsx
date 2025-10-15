/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import CartItemAccordion from "@/components/pages/checkout/CartItemAccordion";
import Order from "./order";
import Shipping from "./Shipping";
import Paiments from "./paiments";
import { SendOrders } from "@/hooks/useProfileForm";
import {
  Form
} from "@/components/ui/form";
interface CartIdProps {
  info: Record<string, any>;
  cartid:string
}
import { useCart } from "@/context/cart-context";
import Loader from "@/components/ui/loader";

const CheckoutPage:FC<CartIdProps> =({info,cartid })  => {
     const { form, onSubmit, isSubmitting } = SendOrders(info.user?.user_metadata.full_name,info.user?.user_metadata.email,info.user?.user_metadata.phone,info.user?.user_metadata.whatsapp,cartid);
  
  const { cart } = useCart();
  const subtotal = cart?.lines.reduce((sum, item) => sum + parseInt(item.cost.totalAmount.amount),0)||0;
    if(!cart?.id){
    return <div className="min-h-screen flex items-center justify-center text-white">Your cart is empty.</div>;
  }

  const taxRate = 0; // 8% tax rate
  const tax =subtotal * taxRate;
  const total = subtotal + tax ;
const userData=JSON.stringify(info)
  return (
    <div className="min-h-screen bg-gaming-darker text-white pb-20">
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-10 mt-24">
          {/* Left Side - Checkout Form */}
          <div className="w-full space-y-8">
        
              {/* Cart Items */}
              <div className="gaming-card p-6 rounded-lg mb-6">
                <h2 className="text-xl font-medium mb-4 flex items-center">
                  <span className="bg-gaming-cyan text-gaming-dark rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    1
                  </span>
                  Votre Panier
                </h2>
                  {cart?<CartItemAccordion items={cart?.lines} />:null }
              </div>

              {/* Shipping Information */}
              <Shipping info={userData}/>
              <br />
              {/* Payment Information */}
              <Paiments />
              <br />

              {/* Order Summary */}
              <Order currencyCode="TND" subtotal={subtotal} tax={tax} total={total}/>
             
              <Form {...form}> <br />
               <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                 {isSubmitting ? (
                      <Loader/>
                    ) :(
              <Button disabled={isSubmitting}
                type="submit" 
                className="w-full py-6 text-lg bg-gaming-cyan hover:bg-gaming-cyan/80 text-gaming-dark font-bold"
              >
                Complete Order {total.toFixed(3)} TND
              </Button>
              )}
              </form>
               </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
