import { TPaymentParams } from "./type";
import { Polar } from "@polar-sh/sdk";
import { ICheckoutprocessPayment } from "@repo/types";
const config = {
  env: process.env.NODE_ENV || "development",
};

const polar = new Polar({
  server: config.env === "production" ? "production" : "sandbox",
});

class PaymentModule {
  async processPayment(params: ICheckoutprocessPayment) {
    polar.checkouts.create({
      amount: params.amount,
      products: params.products,
      currency: params.currency,
      customerEmail: params.customerEmail,
      customerBillingName: params.customerBillingName,
      customerIpAddress: params.customerIpAddress,
      customerName: params.customerName,
      customerId: params.customerId,
      requireBillingAddress: params.requireBillingAddress,
      customerBillingAddress: {
        line1: params.customerBillingAddress.line1,
        line2: params.customerBillingAddress.line2,
        city: params.customerBillingAddress.city,
        state: params.customerBillingAddress.state,
        country: params.customerBillingAddress.country,
      },
    });
  }
}

export const paymentModule = new PaymentModule();
