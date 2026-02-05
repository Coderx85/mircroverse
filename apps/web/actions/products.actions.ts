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

  if (!res || !res.ok) {
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
