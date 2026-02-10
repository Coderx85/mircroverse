import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthHandler } from "./handlers/heatlh";
import {
  createProductHandler,
  deleteProductHandler,
  getProduct,
  getProductsQuery,
  updateProductHandler,
} from "./handlers/product";
import { db } from "@repo/product-db/drizzle/db";

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

// product routes would be registered here
productService.post("/products", createProductHandler);
productService.get("/products", getProductsQuery);
productService.get("/products/:id", getProduct);
productService.put("/products/:id", updateProductHandler);
productService.delete("/products/:id", deleteProductHandler);

// category routes would be registered here

// Start the server
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
