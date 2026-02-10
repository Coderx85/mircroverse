import type { FastifyReply, FastifyRequest } from "fastify";
import { orderModules } from "../../modules/order";
import z from "zod";

const orderZodSchema = z.object({
  userId: z.string(),
  email: z.string(),
  amount: z.number(),
  status: z.enum(["success", "failed"]),
  products: z.array(z.any()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const getorderObject = z.object({
  limit: z.number().int().positive().max(100).default(10),
});

type TOrder =
  Awaited<ReturnType<typeof orderModules.fetchOrders>> extends {
    success: true;
    data: infer T;
  }
    ? T
    : never;

export const getOrderHandler = {
  schema: {
    body: getorderObject,
    params: z.object({
      limit: z.number().int().positive().max(100).default(10),
    }),
  },
  handler: async (
    request: FastifyRequest<{
      Params: {
        limit: number;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const { limit } = request.params;

    const orders = await orderModules.fetchOrders(limit);
    if (!orders.success) {
      return reply.status(404).send({
        ok: false,
        errorMessage: orders.errorMessage || "No orders found",
        error: orders.error || "ORDER_NOT_FOUND",
      });
    }

    // Return the orders in the response
    return reply.send({
      ok: true,
      message: "Orders fetched okfully",
      data: orders.data,
    });
  },
};

export const getOrderByUserIdHandler = {
  schema: {
    params: z.object({
      userId: z.uuid().nonempty("User ID is required"),
    }),
  },
  handler: async (
    request: FastifyRequest<{
      Params: {
        userId: string;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.params;

    try {
      const orders = await orderModules.getOrderByUserId(userId);

      if (!orders.success) {
        return reply.status(404).send({
          ok: false,
          errorMessage: orders.errorMessage || "No orders found for the user",
          error: orders.error || "USER_ORDERS_NOT_FOUND",
        });
      }

      return reply.send({
        ok: true,
        message: "User orders fetched okfully",
        data: orders.data,
      });
    } catch (error) {
      console.error("Error fetching orders for user:", error);
      return reply.status(500).send({
        ok: false,
        errorMessage: "An error occurred while fetching orders for the user",
        error: "USER_ORDERS_FETCH_ERROR",
      });
    }
  },
};
