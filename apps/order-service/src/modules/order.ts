class Order {
  async createOrder({
    userId,
    items,
  }: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
  }) {
    // Implementation for creating an order
  }

  processOrder(orderId: string) {
    // Implementation for processing an order
  }
}

export const order = new Order();
