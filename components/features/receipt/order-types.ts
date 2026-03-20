// components/features/receipt/order-types.ts

export interface OrderInfo {
  status: string;
  createdAt: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  memberId: string | null;
}

export interface OrderDelivery {
  id: string;
  address: string;
  courier: string;
  trackingNumber: string | null;
  status: string;
}

export interface OrderPayment {
  paymentType: string;
  amountPaid: number;
  change: number;
  transactionStatus: string;
}

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  subtotal: number;
}

export interface OrderVoucher {
  id: string;
  code: string;
  description: string;
  discountAmount: number;
}

export interface OrderPoints {
  id: string;
  points: number;
}

export interface OrderItems {
  items: OrderItem[];
  voucher: OrderVoucher | null;
  points: OrderPoints | null;
}
