import { connectOrderDB } from "@repo/order-db";
import Fastify from "fastify";
import { orderRoutes } from "./routes/order/index";
import { healthRoutes } from "./routes/health";

const app = Fastify({ logger: true });

const config = {
  PORT: Number(process.env.PORT) || (4000 as number),
};

const PORT = config.PORT;

app.register(orderRoutes);
app.register(healthRoutes);

const start = async () => {
  try {
    await connectOrderDB();
    console.log("Order service is starting...");
    await app.listen({ port: PORT });
  } catch (error) {
    console.error("Failed to start order service:", error);
    throw new Error("Order service failed to start");
  }
};

start();
