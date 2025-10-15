import { useState, FC, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileUpload, FileWithPreview } from "@/components/ui/File-upload";
import toast from "react-hot-toast";
import { UploadFile } from "@/lib/superbase/products";
import { convertBlobUrlToFile } from "@/lib/common";
import { useStringContext } from "@/context/sharedSeting";
interface ProductImagesUploadProps {
  className?: string;
  bucket: string;
}

const ProductImagesUpload: FC<ProductImagesUploadProps> = ({
  className,
  bucket,
}) => {
  const { setValue, value } = useStringContext();
  useEffect(() => {}, [value]);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFilesChange = (newFiles: FileWithPreview[]) => {
    setFiles(newFiles);
  };
  const handleRemoveFile = (fileId: string) => {
    const fileToRemove = files.find((f) => f.id === fileId);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    setFiles(files.filter((f) => f.id !== fileId));
    toast.caller("Image removed");
  };
  // This would be replaced with actual upload logic 94384916
  async function handleUpload() {
    for (const url of files) {
      if (url.preview) {
        const updatedFiles = files.map((file) => ({
          ...file,
          status: "uploading" as const,
        }));
        setFiles(updatedFiles);
        // Update progress for each file
        files.forEach((file) => {
          let progress = 0;

          const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;

            if (progress >= 100) {
              clearInterval(interval);
              progress = 100;

              setFiles((current) =>
                current.map((f) =>
                  f.id === file.id
                    ? { ...f, progress: 100, status: "success" as const }
                    : f,
                ),
              );

              toast.success(`Uploaded successfuly`);
            } else {
              setFiles((current) =>
                current.map((f) => (f.id === file.id ? { ...f, progress } : f)),
              );
            }
          }, 500); // Update progress every 500ms
        });
        const imageFile = await convertBlobUrlToFile(url.preview);

        const { imageUrl, error } = await UploadFile({
          file: imageFile,
          bucket: bucket,
        });

        if (imageUrl) {
          setValue(imageUrl);
        } else {
          toast.error(error);
        }
      }
    }
  }
  return (
    <Card className="bg-gaming-dark border-gaming-cyan/20">
      <CardHeader>
        <CardTitle>Upload Assets </CardTitle>
        <CardDescription>use url in front or use this input</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileUpload
          value={files}
          onChange={handleFilesChange}
          onRemove={handleRemoveFile}
          accept="image/*"
          multiple={false}
          maxFiles={5}
          maxSize={1}
          className={className}
        />

        {files.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              disabled={files.some((f) => f.status === "uploading")}
              className="bg-gaming-cyan text-gaming-dark hover:bg-gaming-cyan/90 px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              Upload Images
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductImagesUpload;
