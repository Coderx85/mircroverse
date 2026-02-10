import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  index,
  json,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
});

export const product = pgTable(
  "product",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    shortDescription: varchar("short_description", { length: 255 }),
    description: text("description"),
    price: integer("price").notNull(),
    sizes: varchar("sizes").array().notNull(),
    colors: varchar("colors").array().notNull(),
    images: json("images"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    categorySlug: varchar("category_slug", { length: 64 })
      .notNull()
      .references(() => category.slug),
  },
  (table) => [
    index("product_id_idx").on(table.id),
    index("product_category_slug_idx").on(table.categorySlug),
    index("product_price_idx").on(table.price),
  ],
);

export const productRelations = relations(product, ({ one }) => ({
  category: one(category, {
    fields: [product.categorySlug],
    references: [category.slug],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}));

const productDbSchema = createInsertSchema(product);
const categoryDbSchema = createInsertSchema(category);

export type CategoryDbSchema = z.infer<typeof categoryDbSchema>;
export type ProductDbSchema = z.infer<typeof productDbSchema>;

export type GetProductsQuery = {
  sort?: "asc" | "desc" | "oldest";
  category?: string;
  search?: string;
  limit?: number;
};
