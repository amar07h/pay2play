import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  badgeClassName?: string;
  disabled?: boolean;
  maxDisplayItems?: number;
}

export function MultiSelect({
  options,
  selected = [], // Default to empty array if undefined
  onChange,
  placeholder = "Select options",
  className,
  badgeClassName,
  disabled = false,
  maxDisplayItems = 3,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Ensure selected is always an array even if undefined or null is passed
  const selectedValues = Array.isArray(selected) ? selected : [];

  const handleUnselect = (value: string) => {
    onChange(selectedValues.filter((item) => item !== value));
  };

  // Get display labels for selected values, with fallback handling
  const selectedLabels = selectedValues.map(
    (value) => options.find((option) => option.value === value)?.label || value,
  );

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between hover:bg-background",
            selectedValues.length > 0 ? "h-auto min-h-10 py-2" : "h-10",
            className,
          )}
          onClick={() => setOpen(!open)}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1">
            {selectedValues.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selectedValues.length > 0 &&
              selectedLabels.slice(0, maxDisplayItems).map((label, index) => (
                <Badge
                  key={`${selectedValues[index]}-${index}`}
                  className={cn("px-1 py-0", badgeClassName)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(selectedValues[index]);
                  }}
                >
                  {label}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            {selectedValues.length > maxDisplayItems && (
              <Badge className={cn("px-1 py-0", badgeClassName)}>
                +{selectedValues.length - maxDisplayItems} more
              </Badge>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    if (isSelected) {
                      onChange(
                        selectedValues.filter((item) => item !== option.value),
                      );
                    } else {
                      onChange([...selectedValues, option.value]);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50",
                    )}
                  >
                    {isSelected && <X className="h-3 w-3" />}
                  </div>
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
