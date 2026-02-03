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

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
});

export const product = pgTable(
  "product",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    shortDescription: varchar("short_description", { length: 255 }),
    description: text("description"),
    price: integer("price").notNull(),
    sizes: varchar("sizes").array(),
    colors: varchar("colors").array(),
    images: json("images"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    categorySlug: varchar("category_slug", { length: 64 })
      .notNull()
      .references(() => category.slug),
  },
  (table) => [index("product_id_idx").on(table.id)],
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
