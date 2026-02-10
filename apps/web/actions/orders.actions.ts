"use server";

import { config } from "@/lib/config";
import { APIResponse, TOrder } from "@/type";

class OrdersActions {
  async getOrders(): Promise<APIResponse<TOrder[]>> {
    try {
      const res = await fetch(`${config.order_server_url}/orders`);

      if (!res.ok) {
        console.error("Failed to fetch orders:", res.statusText);
        return {
          ok: false,
          errorMessage: `Failed to fetch orders: ${res.statusText || "Unknown error"}`,
          error: `Failed to fetch orders: ${res.statusText || "Unknown error"}`,
        };
      }

      const { data, message } = await res.json();

      if (!data || data.length === 0) {
        return {
          ok: false,
          errorMessage: message,
          error: message,
        };
      }

      return {
        ok: true,
        data: data,
        message: message,
      };
    } catch (error: unknown) {
      console.error("An error occurred while fetching orders:", error);
      return {
        ok: false,
        errorMessage: `An error occurred while fetching orders: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: `An error occurred while fetching orders: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  async getOrdersByUserId(userId: string): Promise<APIResponse<TOrder[]>> {
    try {
      const res = await fetch(
        `${config.order_server_url}/orders/user/${userId}`,
      );

      if (!res.ok) {
        console.error("Failed to fetch orders for user:", res.statusText);
        return {
          ok: false,
          errorMessage: `Failed to fetch orders for user: ${res.statusText || "Unknown error"}`,
          error: `Failed to fetch orders for user: ${res.statusText || "Unknown error"}`,
        };
      }

      const { data, message } = await res.json();

      if (!data || data.length === 0) {
        return {
          ok: false,
          errorMessage: message,
          error: message,
        };
      }

      return {
        ok: true,
        data: data,
        message: message,
      };
    } catch (error: unknown) {
      console.error(
        "An error occurred while fetching orders for the user:",
        error,
      );

      return {
        ok: false,
        errorMessage: `An error occurred while fetching orders for the user: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: `An error occurred while fetching orders for the user: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }
}

export const ordersActions = new OrdersActions();
