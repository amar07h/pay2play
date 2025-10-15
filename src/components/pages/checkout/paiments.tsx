import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Paiments() {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

  return (
    <Accordion
      type="single"
      defaultValue="paiment" 
      collapsible
      className="border rounded-md border-gaming-cyan/20 overflow-hidden"
    >
      <AccordionItem value="paiment" className="border-b-0" >
        <AccordionTrigger  className="py-3 px-4 hover:bg-gaming-dark/40 hover:no-underline bg-gaming-dark/20 group">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-medium mb-4 flex items-center">
              <span className="bg-gaming-cyan text-gaming-dark rounded-full w-6 h-6 flex items-center justify-center mr-2">
                3
              </span>
              Payment Method
            </h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-0 animate-accordion-down " >
          <div className="divide-y divide-gaming-cyan/10">
            <div className="gaming-card p-6 rounded-lg mb-6">
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-md border border-gaming-cyan/30 bg-gaming-dark/50">
                  <RadioGroupItem
                    value="credit-card"
                    id="credit-card"
                    className="border-gaming-cyan text-gaming-cyan"
                  />
                  <Label
                    htmlFor="credit-card"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <CreditCard size={18} className="mr-2 text-gaming-cyan" />
                    <span>KONECT</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-md border border-gaming-cyan/30 bg-gaming-dark/50">
                  <RadioGroupItem
                    value="D17"
                    id="D17"
                    className="border-gaming-cyan text-gaming-cyan"
                  />
                  <Label
                    htmlFor="D17"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <CreditCard size={18} className="mr-2 text-gaming-cyan" />
                    <span>D17</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>{" "}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
