import type { FastifyInstance } from "fastify";
import { getOrderByUserIdHandler, getOrderHandler } from "./handler";

export const orderRoutes = async (app: FastifyInstance) => {
  app.get("/orders/user/:userId", {
    schema: getOrderByUserIdHandler.schema,
    handler: getOrderByUserIdHandler.handler,
  });

  app.get("/orders", {
    schema: getOrderHandler.schema,
    handler: getOrderHandler.handler,
  });
};
