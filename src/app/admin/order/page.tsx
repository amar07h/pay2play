"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/adminLayouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Order } from "@/lib/types/order";

import { GetOrder } from "@/lib/superbase/order";
import { CartItem } from "@/lib/types/cart";
import { formatDate } from "@/lib/common";
const OrdersPage = () => {
  const [orders, setOrdersData] = useState<Order[]>();

  
  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      const orders = await GetOrder();
      setOrdersData(orders);
    };
    fetchOrders();
  }, []);
 
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-14"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Orders Management</h1>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-gaming-dark/50 border-gaming-cyan/30">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
               <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="bg-gaming-dark border-gaming-cyan/20">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Manage customer orders across your platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gaming-cyan">Order ID</TableHead>
                  <TableHead className="text-gaming-cyan">Full Name</TableHead>
                  <TableHead className="text-gaming-cyan">Email</TableHead>
                  <TableHead className="text-gaming-cyan">WhatsApp</TableHead>
                  <TableHead className="text-gaming-cyan">Phone</TableHead>
                  <TableHead className="text-gaming-cyan">Date</TableHead>
                  <TableHead className="text-gaming-cyan">Status</TableHead>
                  <TableHead className="text-gaming-cyan">Items</TableHead>
                  <TableHead className="text-gaming-cyan">Total</TableHead>
                  <TableHead className="text-gaming-cyan">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders &&
                  orders.map((order) => (
                    <TableRow key={order.id} className="border-gaming-cyan/20">
                      <TableCell className="font-medium text-white">
                        #{order.invoice}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.email}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.fullname}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.whatsapp}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.phone}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : order.status === "processing"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Collapsible>
                          <CollapsibleTrigger className="flex items-center gap-2 text-gray-300 hover:text-white">
                            <ChevronDown className="h-4 w-4" />
                            <span> {order.cart[0].lines.length} items</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <div className="space-y-1 text-sm">
                           {order.cart.flatMap((cartItem) =>
  cartItem.lines.map((line:CartItem) => (
    <div 
      key={`${cartItem.id}-${line.id}`} 
      className="flex justify-between items-center border-b border-gray-700 pb-1 text-gray-400"
    >
      <span className="font-medium">{line.merchandise.title}</span>
      <span className="text-sm text-gray-300">x{line.quantity}</span>
      <span className="font-semibold">
        {parseFloat(line.cost.totalAmount.amount).toFixed(3)} TND
      </span>
    </div>
  ))
)}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </TableCell>
                      <TableCell className="font-bold text-gaming-cyan">
                        
                                              {order.cart[0].lines.reduce((sum:number, item:CartItem) => sum + parseInt(item.cost.totalAmount.amount),0).toFixed(3)||0} TND
                        
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 text-accent font-bold">
                       
                            <DropdownMenuItem>
                              
                              Change to Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem className=" text-destructive capitalize font-bold">
                              remove Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
