import { IconActivity } from "@tabler/icons-react";
import ProductList from "../components/product/prduct-list";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <IconActivity className="w-full h-full text-primary" />
      </div>
      <ProductList category={category} />
    </div>
  );
};

export default Homepage;
