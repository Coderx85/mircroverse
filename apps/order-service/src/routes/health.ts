import { FastifyInstance } from "fastify";

export const healthRoutes = (app: FastifyInstance) => {
  app.get("/health", async (request, reply) => {
    return { status: "ok" };
  });
};
