import { db } from "./drizzle/db";
import { product, category } from "./drizzle/schema";

interface Category {
  name: string;
  slug: string;
}

interface Product {
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  categorySlug: string;
}

export async function seedToDB() {
  console.log("Seeding the database...");

  const categories: Category[] = [
    { name: "Electronics", slug: "electronics" },
    { name: "Books", slug: "books" },
  ];

  const products: Product[] = [
    {
      name: "Sample Product",
      description: "This is a sample product.",
      price: 19.99,
      sizes: ["m", "l"],
      colors: ["red", "blue"],
      categorySlug: "electronics",
    },
    {
      name: "Second Brain Book",
      description: "A book about building a second brain.",
      price: 29.99,
      sizes: [],
      colors: [],
      categorySlug: "books",
    },
  ];

  try {
    // Insert categories first (they are referenced by products)
    const insertedCategories = await db
      .insert(category)
      .values(categories)
      .returning();
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Convert product prices to integer cents to match the `integer` column in schema
    const productsToInsert = products.map((p) => ({
      ...p,
      price: Math.round(p.price * 100),
    }));

    const insertedProducts = await db
      .insert(product)
      .values(productsToInsert)
      .returning();
    console.log(`Inserted ${insertedProducts.length} products`);

    const result = {
      categoriesInserted: insertedCategories.length,
      productsInserted: insertedProducts.length,
    };

    console.log("Seed result:", result);
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
    throw error;
  } finally {
    console.log("Database seeding completed.");
  }
}

// Run directly when executed with tsx
seedToDB()
  .then(() => {
    console.log("Seeder finished.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeder failed:", err);
    process.exit(1);
  });
