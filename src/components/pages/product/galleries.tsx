import Image from "next/image";
import { useState, FC } from "react";
import { S3_ENDPOINT } from "@/app.config";
interface ProductsImage {
  product_images: string[];
  title: string;
}
const Galleries: FC<ProductsImage> = ({ product_images, title }) => {
  const [selectedImage, setSelectedImage] = useState<number>(1);
  return (
    <div className="animate-fade-in">
      <div className="gaming-card overflow-hidden rounded-xl mb-4">
        <Image
          height={500}
          width={1000}
          src={S3_ENDPOINT + product_images[selectedImage]}
          alt={title}
          className="w-full h-80 object-contain lg:h-96 transition-all duration-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {product_images.map((img, index) => (
          <button
            key={index}
            className={`gaming-card p-1 overflow-hidden transition-all duration-300 ${
              selectedImage === index
                ? "border-2 border-gaming-cyan "
                : "border border-gaming-cyan/20 hover:border-gaming-cyan/50"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={S3_ENDPOINT + img}
              height={500}
              width={500}
              alt={`${title} thumbnail ${index + 1}`}
              className="w-full h-24 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default Galleries;
