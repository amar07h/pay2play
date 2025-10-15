import { FC } from "react";
import { Category } from "@/lib/types/layouts";
import { Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface CategoryCardProps {
  category: Category;
  onDelete: (id: string) => void;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, onDelete }) => {
  const handleEdit = () => {
    redirect(`/admin/categories?id=${category.id}`);
  };

  return (
    <Card className="relative overflow-hidden h-64 gaming-card group transition-all duration-300 hover:shadow-lg hover:shadow-gaming-cyan/10">
      {/* Color overlay with specified category color */}
      <div className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-80"></div>
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gaming-darker/90 to-transparent">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gaming-cyan transition-colors">
          {category.title}
        </h3>
        {/* Content */}
        {/*   {category.count !== undefined && (
          <p className="text-gray-300">{category.count} Products</p>
        )} */}

        {/* Actions - visible on hover */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 bg-gaming-dark/80 border-gaming-cyan/30 hover:bg-gaming-cyan/20"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 bg-gaming-dark/80 border-red-500/30 hover:bg-red-500/20"
            onClick={() => onDelete(category.id || "1")}
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
