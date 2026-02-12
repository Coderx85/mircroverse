import Fastify from "fastify";

const app = Fastify({ logger: true });

const config = {
  PORT: Number(process.env.PORT) || 8000,
};

const PORT = config.PORT;

const start = async () => {
  try {
    console.log("Payment service is starting...");
    await app.listen({ port: PORT });
  } catch (error) {
    console.error("Failed to start payment service:", error);
    throw new Error("Payment service failed to start");
  }
};

start();
