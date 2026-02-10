"use client";

import { IconMinus, IconPlus, IconShoppingCart } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { colors, sizes, TProduct } from "type";
import { Button } from "@repo/ui/button";

// type definitions
type Props = {
  product: TProduct;
  selectedSize: sizes;
  selectedColor: colors;
};

type handleTypeChangeParams =
  | {
      type: "size";
      value: sizes;
    }
  | {
      type: "color";
      value: colors;
    };

// component
const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTypeChange = (input: handleTypeChangeParams) => {
    const params = new URLSearchParams(searchParams.toString());
    const { type, value } = input;
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleQuantityChange = (action: "increment" | "decrement") => {
    setQuantity((prev) => {
      if (action === "increment") {
        return prev + 1;
      } else {
        return prev > 1 ? prev - 1 : 1;
      }
    });
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log("Added to cart:", {
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${
                selectedSize === size ? "border-gray-600" : "border-gray-300"
              }`}
              key={size}
              onClick={() =>
                handleTypeChange({ type: "size", value: size as sizes })
              }
            >
              <div
                className={`w-6 h-6 text-center flex items-center justify-center ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${
                selectedColor === color ? "border-gray-300" : "border-white"
              }`}
              key={color}
              onClick={() =>
                handleTypeChange({ type: "color", value: color as colors })
              }
            >
              <div className={`w-6 h-6`} style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <Button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <IconMinus className="w-4 h-4" />
          </Button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <IconPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* BUTTONS */}
      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
      >
        <IconPlus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 text-sm font-medium">
        <IconShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>
    </>
  );
};

export default ProductInteraction;
