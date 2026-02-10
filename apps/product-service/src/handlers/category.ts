import { FastifyReply, FastifyRequest } from "fastify";
import {
  category,
  CategoryDbSchema,
  product,
} from "@repo/product-db/drizzle/schema";
import { db } from "@repo/product-db/drizzle/db";
import { eq } from "drizzle-orm";

export const createCategoryHandler = async (
  request: FastifyRequest<{
    Body: CategoryDbSchema;
  }>,
  reply: FastifyReply,
) => {
  try {
    const data = request.body;
    await db.insert(category).values(data);
    return reply
      .status(201)
      .send({ success: true, message: "Category created successfully" });
  } catch (error: unknown) {
    return reply.status(500).send({
      success: false,
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to create category",
    });
  }
};

export const updateCategoryHandler = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<CategoryDbSchema>;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params;
    const data = request.body;
    const result = await db
      .update(category)
      .set(data)
      .where(eq(category.id, parseInt(id, 10)));

    return reply.status(200).send({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    return reply.status(500).send({
      success: false,
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to update category",
    });
  }
};

export const deleteCategoryHandler = async (
  _request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = _request.params;
    const result = await db
      .delete(category)
      .where(eq(category.id, parseInt(id, 10)));
    return reply.status(200).send({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error: unknown) {
    return reply.status(500).send({
      success: false,
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to delete category",
    });
  }
};

export const getCategoriesHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const [categories] = await db.select().from(category);

    if (categories)
      return reply.status(200).send({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      });

    return reply.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error: unknown) {
    return reply.status(500).send({
      success: false,
      error: `${error instanceof Error ? error.message : "Unknown error"}`,
      message: "Failed to fetch categories",
    });
  }
};
