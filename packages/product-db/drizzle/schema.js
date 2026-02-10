"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRelations = exports.productRelations = exports.product = exports.category = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
var drizzle_zod_1 = require("drizzle-zod");
exports.category = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 128 }).notNull(),
    slug: (0, pg_core_1.varchar)("slug", { length: 64 }).notNull().unique(),
});
exports.product = (0, pg_core_1.pgTable)("product", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    shortDescription: (0, pg_core_1.varchar)("short_description", { length: 255 }),
    description: (0, pg_core_1.text)("description"),
    price: (0, pg_core_1.integer)("price").notNull(),
    sizes: (0, pg_core_1.varchar)("sizes").array().notNull(),
    colors: (0, pg_core_1.varchar)("colors").array().notNull(),
    images: (0, pg_core_1.json)("images"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
    categorySlug: (0, pg_core_1.varchar)("category_slug", { length: 64 })
        .notNull()
        .references(function () { return exports.category.slug; }),
}, function (table) { return [
    (0, pg_core_1.index)("product_id_idx").on(table.id),
    (0, pg_core_1.index)("product_category_slug_idx").on(table.categorySlug),
    (0, pg_core_1.index)("product_price_idx").on(table.price),
]; });
exports.productRelations = (0, drizzle_orm_1.relations)(exports.product, function (_a) {
    var one = _a.one;
    return ({
        category: one(exports.category, {
            fields: [exports.product.categorySlug],
            references: [exports.category.slug],
        }),
    });
});
exports.categoryRelations = (0, drizzle_orm_1.relations)(exports.category, function (_a) {
    var many = _a.many;
    return ({
        products: many(exports.product),
    });
});
var productDbSchema = (0, drizzle_zod_1.createInsertSchema)(exports.product);
var categoryDbSchema = (0, drizzle_zod_1.createInsertSchema)(exports.category);
