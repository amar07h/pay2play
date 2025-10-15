import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { MultiSelect, Option } from "@/components/ui/multiSelect";
import { cn } from "@/lib/utils";

interface FormMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  options: Option[];
  className?: string;
  selectClassName?: string;
  badgeClassName?: string;
  disabled?: boolean;
  maxDisplayItems?: number;
  required?: boolean;
}

export function FormMultiSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  placeholder,
  options,
  className,
  selectClassName,
  badgeClassName,
  disabled = false,
  maxDisplayItems,
  required = false,
}: FormMultiSelectProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel
              className={cn(
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-red-500",
              )}
            >
              {label}
            </FormLabel>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <MultiSelect
              options={options}
              selected={field.value || []}
              onChange={(value) => {
                // Ensure we're always passing an array to react-hook-form
                field.onChange(value || []);
              }}
              placeholder={placeholder}
              className={selectClassName}
              badgeClassName={badgeClassName}
              disabled={disabled}
              maxDisplayItems={maxDisplayItems}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
