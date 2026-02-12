"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Select } from "@repo/ui/select";
import { Spinner } from "@repo/ui/spinner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/form";
import { config } from "@/lib/config";

import { ICheckoutprocessPayment } from "@repo/types";

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  amount: z.number().positive("Amount must be greater than 0"),
  customerBillingAddress: z.object({
    line1: z.string().min(1, "Street address is required"),
    line2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.enum(["IN"]),
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type CheckoutPayload = Omit<ICheckoutprocessPayment, "customerIpAddress">;

export const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      amount: 0,
      customerBillingAddress: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "IN",
      },
    },
  });

  const { handleSubmit, control, reset, formState } = form;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload: CheckoutPayload = {
        customerId: `customer_${Date.now()}`,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        amount: data.amount,
        currency: "usd",
        products: [],
        requireBillingAddress: true,
        customerBillingName: data.customerName,
        customerBillingAddress: data.customerBillingAddress,
      };

      const response = await fetch(`${config.payment_server_url}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Payment processing failed");

      await response.json();
      setSuccessMessage("Payment processed successfully!");
      reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Checkout</h1>
          <p className="text-slate-600 mb-8">
            Complete your payment details below
          </p>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <Form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Customer Information
              </h2>

              <div className="space-y-4">
                <FormField>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="customerName"
                        render={({ field }: any) => (
                          <Input
                            {...field}
                            placeholder="John Doe"
                            className="w-full"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1">
                      {formState.errors.customerName?.message as string}
                    </FormMessage>
                  </FormItem>
                </FormField>

                <FormField>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="customerEmail"
                        render={({ field }: any) => (
                          <Input
                            {...field}
                            placeholder="john@example.com"
                            type="email"
                            className="w-full"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1">
                      {formState.errors.customerEmail?.message as string}
                    </FormMessage>
                  </FormItem>
                </FormField>

                <FormField>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                      Amount (USD) *
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="amount"
                        render={({ field }: any) => (
                          <Input
                            {...field}
                            placeholder="99.99"
                            type="number"
                            step="0.01"
                            className="w-full"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1">
                      {formState.errors.amount?.message as string}
                    </FormMessage>
                  </FormItem>
                </FormField>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Billing Address
              </h2>

              <div className="space-y-4">
                <FormField>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                      Street Address *
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="customerBillingAddress.line1"
                        render={({ field }: any) => (
                          <Input
                            {...field}
                            placeholder="123 Main St"
                            className="w-full"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1">
                      {
                        (formState.errors.customerBillingAddress as any)?.line1
                          ?.message as string
                      }
                    </FormMessage>
                  </FormItem>
                </FormField>

                <FormField>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                      Apartment, Suite, etc. (Optional)
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="customerBillingAddress.line2"
                        render={({ field }: any) => (
                          <Input
                            {...field}
                            placeholder="Apt 4B"
                            className="w-full"
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField>
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                        City
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={control}
                          name="customerBillingAddress.city"
                          render={({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Mumbai"
                              className="w-full"
                            />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField>
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                        State
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={control}
                          name="customerBillingAddress.state"
                          render={({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Maharashtra"
                              className="w-full"
                            />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>

                <FormField>
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-slate-700 mb-2">
                      Country *
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="customerBillingAddress.country"
                        render={({ field }: any) => (
                          <Select
                            {...field}
                            defaultValue={field.value ?? "IN"}
                            className="w-full"
                          >
                            <option value="IN">India</option>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner className="w-4 h-4" />
                    Processing Payment...
                  </span>
                ) : (
                  "Complete Payment"
                )}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};
