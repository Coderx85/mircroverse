export const config = {
  product_server_url:
    process.env.PRODUCT_SERVICE_URL || "http://localhost:4000",
  order_server_url: process.env.ORDER_SERVICE_URL || "http://localhost:5000",
  payment_server_url:
    process.env.PAYMENT_SERVICE_URL || "http://localhost:3001",
};
