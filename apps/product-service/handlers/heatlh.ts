import type { FastifyReply, FastifyRequest } from "fastify";

export const healthHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  return reply.status(200).send({
    status: "ok",
    service: "product-service",
    timestamp: new Date().toISOString(),
  });
};
