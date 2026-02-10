import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./drizzle/db";

export default defineConfig({
  dbCredentials: {
    url: DATABASE_URL,
  },
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
});
