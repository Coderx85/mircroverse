"use server";
import type { TProduct, TProductSearchQuery } from "@repo/types";
import { config } from "@/lib/config";
import { APIResponse } from "type";

type TProducts = Required<TProduct>[];
export const fetchProductsByCategory = async ({
  category,
  search,
  sort,
  limit = 8,
}: TProductSearchQuery): Promise<APIResponse<TProducts>> => {
  const res = await fetch(
    `${config.product_server_url}/products?${category ? `category=${category}&` : ""}${search ? `search=${search}&` : ""}${sort ? `sort=${sort}&` : ""}limit=${limit}`,
  );
  console.log("Fetch products response:", res);

  if (!res || !res.ok) {
    console.error("Failed to fetch products:", res.statusText);
    return {
      ok: false,
      errorMessage: `Failed to fetch products: ${res.statusText || "Unknown error"}`,
      error: `Failed to fetch products: ${res.statusText || "Unknown error"}`,
    };
  }

  const data: TProducts = await res.json();

  if (!data || data.length === 0 || !Array.isArray(data)) {
    return {
      ok: false,
      errorMessage: "No products found",
      error: "No products found",
    };
  }

  return {
    ok: true,
    message: "Products fetched successfully",
    data,
  };
};

export const fetchProduct = async (id: string): Promise<TProduct | null> => {
  const res = await fetch(`${config.product_server_url}/products/${id}`);

  if (!res || !res.ok) {
    console.error(`Failed to fetch product with id ${id}:`, res.statusText);
    return null;
  }

  const data: TProduct = await res.json();

  if (!data || typeof data !== "object") {
    console.error(`Invalid product data received for id ${id}:`, data);
    return null;
  }

  return data;
};
