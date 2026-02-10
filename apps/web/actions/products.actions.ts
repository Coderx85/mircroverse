"use server";
import { NextResponse } from "next/server";
import type { TProduct, TProductSearchQuery } from "@repo/types";
import { config } from "../lib/config";

type TProducts = Required<TProduct>[];

type APIResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

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
      success: false,
      error: `Failed to fetch products: \n ${res.statusText || "Unknown error"}`,
    };
  }

  const data: TProducts = await res.json();

  if (!data || data.length === 0 || !Array.isArray(data)) {
    return {
      success: false,
      error: "No products found",
    };
  }

  return {
    success: true,
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
