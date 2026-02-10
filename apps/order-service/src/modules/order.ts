import { Order, OrderSchemaType } from "@repo/order-db";

type TOrder = OrderSchemaType;

type TFetchOrdersResult =
  | {
      success: true;
      message: string;
      data: TOrder[];
    }
  | {
      success: false;
      error: string;
      errorMessage: string;
    };

class OrderModules {
  /**
   * @param limit
   * @returns {TFetchOrdersResult}
   *
   */
  async fetchOrders(limit: number): Promise<TFetchOrdersResult> {
    {
      try {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(limit);

        if (!orders || orders.length === 0) {
          return {
            success: false,
            error: "No orders found",
            errorMessage: "No orders found in the database",
          };
        }
        return {
          data: orders,
          success: true,
          message: "Orders fetched successfully",
        };
      } catch (error: unknown) {
        return {
          success: false,
          error: "Failed to fetch orders",
          errorMessage: `An error occurred while fetching orders: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        };
      }
    }
  }

  async getOrderByUserId(userId: string) {
    try {
      const orders = await Order.find({ userId }).sort({
        createdAt: -1,
      });

      if (!orders || orders.length === 0) {
        return {
          success: false,
          error: "No orders found for the user",
          errorMessage: "No orders found for the user in the database",
        };
      }

      return {
        success: true,
        data: orders,
        message: "Orders fetched successfully",
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: "Failed to fetch orders for the user",
        errorMessage: `An error occurred while fetching orders for the user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }
}

export const orderModules = new OrderModules();
