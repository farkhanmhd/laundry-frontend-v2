import type {
  OrderCustomer,
  OrderDelivery,
  OrderInfo,
  OrderItems,
  OrderPayment,
} from "@/components/features/receipt/order-types";
import { elysia } from "@/elysia";

export type ReceiptLookupResult = Partial<
  NonNullable<
    Awaited<ReturnType<typeof elysia.receipt.lookup.get>>["data"]
  >["data"]
>;

export abstract class ReceiptApi {
  static async lookupReceipt(orderId: string): Promise<ReceiptLookupResult> {
    const { data: response } = await elysia.receipt.lookup.get({
      query: { orderId },
    });

    if (!response || response.status !== "success") {
      return { orderId, exists: false };
    }

    return response.data;
  }

  static async fetchOrderInfo(orderId: string): Promise<OrderInfo> {
    const { data: response } = await elysia.receipt({ id: orderId }).info.get();

    if (!response || response.status !== "success") {
      throw new Error("Failed to load order info");
    }

    return response.data;
  }

  static async fetchOrderCustomer(orderId: string): Promise<OrderCustomer> {
    const { data: response } = await elysia
      .receipt({ id: orderId })
      .customer.get();

    if (!response || response.status !== "success") {
      throw new Error("Failed to load customer info");
    }

    return response.data;
  }

  static async fetchOrderDeliveries(orderId: string): Promise<OrderDelivery[]> {
    const { data: response } = await elysia
      .receipt({ id: orderId })
      .deliveries.get();

    if (!response || response.status !== "success") {
      throw new Error("Failed to load deliveries");
    }

    return response.data;
  }

  static async fetchOrderPayment(orderId: string): Promise<OrderPayment> {
    const { data: response } = await elysia
      .receipt({ id: orderId })
      .payment.get();

    if (!response || response.status !== "success") {
      throw new Error("Failed to load payment info");
    }

    return response.data;
  }

  static async fetchOrderItems(orderId: string): Promise<OrderItems> {
    const { data: response } = await elysia
      .receipt({ id: orderId })
      .items.get();

    if (!response || response.status !== "success") {
      throw new Error("Failed to load order items");
    }

    return response.data;
  }
}
