import { FastifyReply, FastifyRequest } from "fastify";
import { paymentModule } from "./module";
import { ICheckoutprocessPayment } from "@repo/types";

export const checkoutHandler = async (
  request: FastifyRequest<{
    Body:
      | ICheckoutprocessPayment
      | Omit<ICheckoutprocessPayment, "customerIpAddress">;
  }>,
  reply: FastifyReply,
) => {
  const body = request.body as ICheckoutprocessPayment;

  // ensure IP is present (client may omit it)
  const payload: ICheckoutprocessPayment = {
    ...body,
    customerIpAddress: (body as any).customerIpAddress || request.ip,
  };

  await paymentModule.processPayment(payload);
  reply.status(200).send({ ok: true });
};
