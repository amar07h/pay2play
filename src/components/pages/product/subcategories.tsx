import { SubCategory } from "@/lib/types/layouts";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { S3_ENDPOINT } from "@/app.config";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Deletesub_categories } from "@/lib/superbase/subcategories";
import { toast } from "react-hot-toast";
import { FC } from "react";
interface SubCategoryCardProps {
  SubCategory: SubCategory;
  isAdmin: boolean;
}

const CategoryCard: FC<SubCategoryCardProps> = ({ SubCategory, isAdmin }) => {
  const handleEdit = () => {
    redirect(`/admin/subcategories?id=${SubCategory.id}`);
  };
  async function handleDeleteCategory(id: string) {
    await Deletesub_categories(id);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Deleting category...",
      success: () => {
        return "Category deleted successfully!";
      },
      error: "Failed to delete category.",
    });
  }

  return (
    
    <Card className="relative overflow-hidden h-32 lg:64 gaming-card group transition-all duration-300 hover:shadow-lg hover:shadow-gaming-cyan/10">
      {/* Color overlay with specified category color */}
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-80"
        style={{
          background: `linear-gradient(to bottom right, ${SubCategory.color || "#0ecdf1"}40, ${SubCategory.color || "#0ecdf1"}80)`,
        }}
      ></div>

      {/* Image */}
      <Image
        height={500}
        width={500}
        src={`${S3_ENDPOINT}${SubCategory.featureImage}`}
        alt={SubCategory.title}
        className="absolute inset-0 w-full h-full object-contain object-center p-8 transition-transform duration-500 group-hover:scale-110"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gaming-darker/90 to-transparent">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gaming-cyan transition-colors">
          {SubCategory.title}
        </h3>
      </div>
      {/* Actions - visible on hover only admin */}
      {isAdmin ? (
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
            onClick={() => handleDeleteCategory(SubCategory.handle)}
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      ) : null}
    </Card>
  );
};

export default CategoryCard;
