import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthHandler } from "../handlers/heatlh";

const config = {
  serviceName: "Product Service",
  port: Number(process.env.PORT) || 4002,
};

const productService = Fastify({ logger: true });

productService.register(cors, {
  origin: "*",
  credentials: true,
});

productService.get("/health", healthHandler);

const start = async () => {
  try {
    await productService.listen({ port: config.port });
    productService.log.info(
      `${config.serviceName} is running at http://localhost:${config.port}`,
    );
  } catch (err) {
    productService.log.error(err);
    process.exit(1);
  }
};

start();
