import { db } from "@repo/product-db/drizzle/db";
import { product } from "@repo/product-db/drizzle/schema";
import { seed } from "drizzle-seed";

export async function seedToDB() {
  // await db;
  console.log("Seeding the database...");

  try {
    const result = await seed(db, { product });
    console.log("Seed result:", result);
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
  console.log("Database seeding completed.");
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
