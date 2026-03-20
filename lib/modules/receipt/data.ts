// lib/modules/receipt/data.ts
import type {
  OrderCustomer,
  OrderDelivery,
  OrderInfo,
  OrderItems,
  OrderPayment,
} from "@/components/features/receipt/order-types";

// Simulate a network delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// TODO: replace each function body with your real fetch call, e.g.:
//   const res = await fetch(`/api/orders/${orderId}/info`);
//   if (!res.ok) throw new Error("Failed to load order info");
//   return res.json();
// ---------------------------------------------------------------------------

export async function fetchOrderInfo(orderId: string): Promise<OrderInfo> {
  console.log(orderId);
  await delay(600);
  return {
    status: "processing",
    createdAt: "2026-02-24 16:08:35.224+07",
  };
}

export async function fetchOrderCustomer(
  orderId: string
): Promise<OrderCustomer> {
  console.log(orderId);
  await delay(800);
  return {
    name: "Ade Ade Santoso",
    phone: "+627850462",
    memberId: "m-256276",
  };
}

export async function fetchOrderDeliveries(
  orderId: string
): Promise<OrderDelivery[]> {
  console.log(orderId);
  await delay(1000);
  return [];
}

export async function fetchOrderPayment(
  orderId: string
): Promise<OrderPayment> {
  console.log(orderId);
  await delay(700);
  return {
    paymentType: "qris",
    amountPaid: 25_000,
    change: 0,
    transactionStatus: "settlement",
  };
}

export async function fetchOrderItems(orderId: string): Promise<OrderItems> {
  console.log(orderId);
  await delay(900);
  return {
    items: [
      {
        id: "item-1",
        name: "Cuci Setrika",
        qty: 3,
        price: 7000,
        subtotal: 21_000,
      },
      {
        id: "item-2",
        name: "Cuci Kering",
        qty: 2,
        price: 5000,
        subtotal: 10_000,
      },
      {
        id: "item-3",
        name: "Setrika Saja",
        qty: 1,
        price: 4000,
        subtotal: 4000,
      },
    ],
    voucher: {
      id: "od-21101",
      code: "DISC5RB",
      description: "Diskon Rp 5.000",
      discountAmount: -5000,
    },
    points: {
      id: "od-78898",
      points: -5000,
    },
  };
}
