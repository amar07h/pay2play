import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { redirect } from "next/navigation";

interface FormActionsProps {
  isSubmitting: boolean;
}

export function FormActions({ isSubmitting }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => redirect("/admin/inventory")}
        className="gap-2"
      >
        <X className="h-4 w-4" />
        Cancel
      </Button>
      <Button
        type="submit"
        className="bg-gaming-cyan text-gaming-dark hover:bg-gaming-cyan/90 gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>Adding...</>
        ) : (
          <>
            <Check className="h-4 w-4" />
            Add Product
          </>
        )}
      </Button>
    </div>
  );
}
