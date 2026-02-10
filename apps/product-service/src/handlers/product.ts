import { FastifyReply, FastifyRequest } from "fastify";
import {
  GetProductsQuery,
  product,
  ProductDbSchema,
} from "@repo/product-db/drizzle/schema";
import { db } from "@repo/product-db/drizzle/db";
import { and, asc, desc, eq } from "drizzle-orm";

export const createProductHandler = async (
  request: FastifyRequest<{
    Body: ProductDbSchema;
  }>,
  reply: FastifyReply,
) => {
  try {
    const data = request.body;

    const { colors, images } = data;

    if (!colors || colors.length === 0 || !Array.isArray(colors)) {
      return reply.status(400).send({
        status: "false",
        message: "Colors must be a non-empty array",
        error: "Invalid colors field",
      });
    }

    if (!images || typeof images !== "object") {
      return reply.status(400).send({
        status: "false",
        message: "Images must be a valid object",
        error: "Invalid images field",
      });
    }

    const missingColors = colors.filter((color) => !(color in images));
    if (missingColors.length > 0) {
      return reply.status(400).send({
        status: "false",
        message: `Images missing for colors: ${missingColors.join(", ")}`,
        error: "Incomplete images field",
      });
    }

    const result = await db.insert(product).values(data).returning();

    return reply.status(201).send({ status: "success", data: result });
  } catch (error: unknown) {
    return reply.status(500).send({
      status: "error",
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to create product",
    });
  }
};

export const updateProductHandler = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<ProductDbSchema>;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params;
    const data = request.body;
    const result = await db
      .update(product)
      .set(data)
      .where(eq(product.id, parseInt(id, 10)));

    return reply.status(200).send({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    return reply.status(500).send({
      status: false,
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to update product",
    });
  }
};

export const deleteProductHandler = async (
  _request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = _request.params;
    const result = await db
      .delete(product)
      .where(eq(product.id, parseInt(id, 10)));

    return reply.status(200).send({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error: unknown) {
    return reply.status(500).send({
      status: false,
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to delete product",
    });
  }
};

export const getProductsQuery = async (
  request: FastifyRequest<{
    Querystring: GetProductsQuery;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { sort, category, search, limit } = request.query;

    const orderBy = (() => {
      switch (sort) {
        case "asc":
          return asc(product.price);
          break;
        case "desc":
          return desc(product.price);
          break;
        case "oldest":
          return asc(product.createdAt);
          break;
        default:
          return desc(product.createdAt);
      }
    })();
    const products = await db
      .select()
      .from(product)
      .where(
        and(
          eq(product.categorySlug, category || ""),
          eq(product.name, search || ""),
        ),
      )
      .orderBy(orderBy)
      .limit(limit || 20);

    return reply.status(200).send({ success: "true", data: products });
  } catch (error: unknown) {
    return reply.status(500).send({
      success: "false",
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to fetch categories",
    });
  }
};

export const getProduct = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params;
    const [productData] = await db
      .select()
      .from(product)
      .where(eq(product.id, parseInt(id, 10)));

    if (!productData) {
      return reply.status(404).send({
        success: false,
        message: "Product not found",
        error: `No product found with id ${id}`,
      });
    }

    return reply.status(200).send({
      success: true,
      message: "Product fetched successfully",
      data: productData,
    });
  } catch (error: unknown) {
    return reply.status(500).send({
      success: false,
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to fetch product",
    });
  }
};
