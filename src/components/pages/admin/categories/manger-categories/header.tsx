import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Categories Page</h1>
        <p className="text-gray-400 mt-1">Manage your product categories</p>
      </div>

      <Button
        onClick={() => redirect("/admin/categories")}
        className="bg-gaming-cyan text-gaming-dark hover:bg-gaming-cyan/90"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
}
