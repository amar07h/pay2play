import { useState, Fragment } from "react";
import { Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function OrderTab() {
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const viewOrderDetails = (orderId: number) => {
    setSelectedOrder(orderId);
    setOrderDetailsOpen(true);
  };
  return (
    <Fragment>
      <Card className="bg-gaming-dark border-gaming-cyan/20">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View your recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="border border-gaming-cyan/20 rounded-lg p-4 hover:border-gaming-cyan/40 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">
                    Order #{1000 + order}
                  </span>
                  <span className="text-sm text-gaming-cyan">Delivered</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  Placed on March {order + 10}, 2023
                </div>
                <Separator className="my-2 bg-gaming-cyan/20" />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-300">3 items</span>
                  <span className="font-medium text-white">
                    ${(99.99 * order).toFixed(2)}
                  </span>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gaming-cyan border-gaming-cyan/30 hover:bg-gaming-cyan/10"
                    onClick={() => viewOrderDetails(1000 + order)}
                  >
                    <Eye className="mr-1 h-4 w-4" /> View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Order Details Dialog */}
      <AlertDialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <AlertDialogContent className="bg-gaming-dark border-gaming-cyan/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Order #{selectedOrder}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              <div className="space-y-4 mt-2">
                <div className="p-3 border border-gaming-cyan/20 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">
                      Gaming Keyboard
                    </span>
                    <span className="text-white">$149.99</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    RGB Mechanical Gaming Keyboard
                  </div>
                </div>
                <div className="p-3 border border-gaming-cyan/20 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">Gaming Mouse</span>
                    <span className="text-white">$79.99</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Wireless Gaming Mouse
                  </div>
                </div>
                <div className="p-3 border border-gaming-cyan/20 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">Headset</span>
                    <span className="text-white">$129.99</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    7.1 Surround Sound Gaming Headset
                  </div>
                </div>

                <Separator className="bg-gaming-cyan/20" />

                <div className="flex justify-between text-white">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">$359.97</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                  <div>
                    <p className="font-medium text-gray-300">
                      Shipping Address:
                    </p>
                    <p>123 Gaming Street</p>
                    <p>GameCity, GS 12345</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">Order Date:</p>
                    <p>March 12, 2023</p>
                    <p className="font-medium text-gray-300 mt-2">Status:</p>
                    <p className="text-gaming-cyan">Delivered</p>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gaming-cyan text-gaming-dark hover:bg-gaming-cyan/90">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}

export default OrderTab;
