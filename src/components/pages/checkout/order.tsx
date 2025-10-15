import { CheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

interface OrderProps {
  tax:number,
  subtotal:number
  total:number,
  currencyCode:string
}
const Order:FC<OrderProps> = ({tax,total,currencyCode,subtotal })  =>{

  return (
    <div className="w-full">
      <div className="gaming-card p-6 rounded-lg sticky top-8">
        <h2 className="text-xl font-medium mb-4 flex items-center">
          <span className="bg-gaming-cyan text-gaming-dark rounded-full w-6 h-6 flex items-center justify-center mr-2">
            4
          </span>
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal</span>
            <span>{subtotal.toFixed(3)}{currencyCode}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Tax</span>
            <span>{tax.toFixed(3)}{currencyCode}</span>
          </div>
          <Separator className="my-3 bg-gaming-cyan/20" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-gaming-cyan">{total.toFixed(3)}{currencyCode}</span>
          </div>
        </div>

        <div className="mt-6 bg-gaming-dark/50 p-4 rounded-md border border-gaming-cyan/20 flex items-center">
          <CheckIcon className="text-gaming-cyan mr-2 min-w-5" size={20} />
          <p className="text-sm text-gray-300">
            Your personal data will be used to process your order, support your
            experience, and for other purposes described in our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Order