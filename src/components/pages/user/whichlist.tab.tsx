import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, ShoppingCart } from "lucide-react";
import { WishlistItem } from "@/lib/types/layouts";
// Mock wishlist data (in a real app, this would come from an API or state management)
const mockWishlist: WishlistItem[] = [
  {
    id: 1,
    productId: 1,
    product: {
      id: "1",
      name: "Gaming Mechanical Keyboard RGB",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      rating: 4.8,
      category: "Keyboards",
      isNew: true,
      isFeatured: true,
      stock: 45,
    },
  },
  {
    id: 2,
    productId: 2,
    product: {
      id: "2",
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      rating: 4.5,
      category: "Mice",
      stock: 32,
    },
  },
  {
    id: 3,
    productId: 3,
    product: {
      id: "3",
      name: "Gaming Headset 7.1 Surround",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      rating: 4.7,
      category: "Audio",
      stock: 18,
    },
  },
];
function WhishtTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(mockWishlist);

  const filteredItems = wishlistItems.filter(
    (item) =>
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen gaming-gradient">
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-3xl font-bold leading-9 text-center tracking-tight text-white  animate-glow">
              {"Products you've saved for later."}
            </h2>
          </div>

          <Card className="bg-gaming-dark border-gaming-cyan/20">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search wishlist..."
                    className="bg-gaming-dark/50 border-gaming-cyan/30 pl-9 w-[200px] md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400">No wishlist items found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-gaming-dark/30 overflow-hidden">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>{item.product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>${item.product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              item.product.stock && item.product.stock > 20
                                ? "bg-green-500/20 text-green-400"
                                : item.product.stock && item.product.stock > 10
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {item.product.stock} in stock
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span className="sr-only">Add to Cart</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 w-8 p-0"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default WhishtTab;
