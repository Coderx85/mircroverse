import ProductList from "components/product/prduct-list";
import React from "react";
import { TProductSearchQuery } from "@repo/types";

type TSearch = TProductSearchQuery;

type ProductsPageProps = {
  searchParams: Promise<{
    category: TSearch["category"];
    sort: TSearch["sort"];
    search: TSearch["search"];
  }>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { category } = await searchParams;
  const { sort } = await searchParams;
  const { search } = await searchParams;

  return (
    <main>
      <ProductList category={category} sort={sort} search={search} />
    </main>
  );
};

export default ProductsPage;
