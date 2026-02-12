import React from "react";
import { TProductSearchQuery } from "@repo/types";
import { fetchProductsByCategory } from "actions/products.actions";
import Link from "next/link";
import ProductCard from "./product-card";

const ProductList = async ({
  category,
  search,
  sort,
  limit,
}: TProductSearchQuery) => {
  const res = await fetchProductsByCategory({
    category,
    search,
    sort,
    limit,
  });

  if (!res || res.ok === false || res.data.length === 0) {
    return <div>No products found.</div>;
  }

  const { data } = res;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
