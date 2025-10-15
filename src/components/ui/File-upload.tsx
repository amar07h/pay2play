import React, { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Upload, X, File, Check, AlertCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/Progress";
import toast from "react-hot-toast";
export type FileStatus = "idle" | "uploading" | "success" | "error";

export interface FileWithPreview extends File {
  id: string;
  preview?: string;
  progress: number;
  status: FileStatus;
  errorMessage?: string;
}

interface FileUploadProps {
  className?: string;
  value?: FileWithPreview[];
  onChange?: (files: FileWithPreview[]) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (fileId: string) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  disabled?: boolean;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      value = [],
      onChange,
      onRemove,
      accept = "image/*",
      multiple = true,
      maxFiles = 5,
      maxSize = 1, // 5MB default max size
      disabled = false,
    },
    ref,
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
      (files: FileList | null) => {
        if (!files || !files.length) return;

        const filesArray = Array.from(files);
        const newFiles: FileWithPreview[] = [];

        // Check if adding these files would exceed the maxFiles limit
        if (value.length + filesArray.length > maxFiles) {
          // You could show a toast or alert here instead
          toast.error(`You can only upload up to ${maxFiles} files`);
          return;
        }

        filesArray.forEach((file) => {
          // Check file size (convert maxSize from MB to bytes)
          if (file.size > maxSize * 1024 * 1024) {
            toast.error(
              `File ${file.name} is too large. Maximum size is ${maxSize}MB`,
            );
            return;
          }

          const id = crypto.randomUUID();
          const preview = file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined;

          newFiles.push({
            ...file,
            id,
            preview,
            progress: 0,
            status: "idle",
          });
        });

        if (newFiles.length > 0 && onChange) {
          onChange([...value, ...newFiles]);
        }
      },
      [maxFiles, maxSize, onChange, value],
    );

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && !disabled) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && !disabled) {
        handleFiles(e.target.files);
      }
    };

    const handleRemove = (id: string) => {
      if (disabled) return;

      if (onRemove) {
        onRemove(id);
      } else if (onChange) {
        const file = value.find((f) => f.id === id);
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
        onChange(value.filter((f) => f.id !== id));
      }
    };

    const openFilePicker = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    };

    const getFileIcon = (file: FileWithPreview) => {
      if (file.preview) {
        return (
          <div className="relative w-full h-full overflow-hidden rounded-md">
            <Image
              width={500}
              height={500}
              src={file.preview}
              alt={"file.name"}
              className="w-full h-full object-cover"
            />
          </div>
        );
      }

      if (file.type.startsWith("image/")) {
        return <ShoppingBag className="text-gaming-cyan" />;
      }

      return <File className="text-gaming-cyan" />;
    };

    const getFileStatusIcon = (status: FileStatus) => {
      switch (status) {
        case "success":
          return <Check className="text-green-500" />;
        case "error":
          return <AlertCircle className="text-red-500" />;
        default:
          return null;
      }
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFilePicker}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            "flex flex-col items-center justify-center min-h-[150px]",
            dragActive
              ? "border-gaming-cyan bg-gaming-dark/70"
              : "border-gaming-cyan/30 bg-gaming-dark/50 hover:bg-gaming-dark/70",
            disabled && "opacity-60 cursor-not-allowed",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="hidden"
            disabled={disabled}
          />
          <Upload className="h-10 w-10 text-gaming-cyan mb-2" />
          <div className="text-sm font-medium space-y-1">
            <p>Drop your files here or click to browse</p>
            <p className="text-muted-foreground text-xs">
              {multiple
                ? `Upload up to ${maxFiles} files (max ${maxSize}MB each)`
                : `Max file size: ${maxSize}MB`}
            </p>
          </div>
        </div>

        {value.length > 0 && (
          <div className="space-y-2">
            {value.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-md bg-gaming-dark/80 border border-gaming-cyan/20"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gaming-dark/50 rounded-md">
                  {getFileIcon(file)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate pr-2">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {getFileStatusIcon(file.status)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(file.id);
                        }}
                        disabled={disabled || file.status === "uploading"}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {file.status === "uploading" && (
                    <Progress
                      value={file.progress}
                      className="h-1 w-full bg-gaming-cyan/20"
                    />
                  )}
                  {file.status === "error" && file.errorMessage && (
                    <p className="text-xs text-destructive">
                      {file.errorMessage}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
