export interface ICheckoutprocessPayment {
  amount: number;
  products: string[];
  currency: "usd";
  customerEmail: string;
  customerBillingName: string;
  customerIpAddress: string;
  customerName: string;
  customerId: string;
  requireBillingAddress: boolean;
  customerBillingAddress: {
    line1: string;
    line2?: string;
    city?: string;
    state?: string;
    country: "IN";
  };
}
