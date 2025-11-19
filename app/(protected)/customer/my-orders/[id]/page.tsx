"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface OrderData {
  id: string;
  createdAt: string;
  status: "pending" | "processing" | "ready" | "completed";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: string;
  paymentMethod: string;
  deliveryAddress: string;
  deliveryPhone: string;
  deliveryDate: string;
  notes: string;
}

const mockOrderDetails: Record<string, OrderData> = {
  "o-12345": {
    id: "o-12345",
    createdAt: "2025-11-10T09:00:00",
    status: "completed",
    items: [
      {
        id: "1",
        name: "Dry Cleaning",
        quantity: 5,
        price: 25_000,
        subtotal: 125_000,
      },
    ],
    subtotal: 125_000,
    discount: 0,
    total: 125_000,
    paymentStatus: "paid",
    paymentMethod: "QRIS",
    deliveryAddress: "Jl. Merdeka 123, Jakarta Pusat",
    deliveryPhone: "+62812345678",
    deliveryDate: "2025-11-12",
    notes: "Handle with care - delicate fabrics",
  },
  "o-12346": {
    id: "o-12346",
    createdAt: "2025-11-11T10:30:00",
    status: "ready",
    items: [
      {
        id: "1",
        name: "Laundry & Iron",
        quantity: 10,
        price: 15_000,
        subtotal: 150_000,
      },
      {
        id: "2",
        name: "Express Service",
        quantity: 1,
        price: 35_000,
        subtotal: 35_000,
      },
    ],
    subtotal: 185_000,
    discount: 20_000,
    total: 165_000,
    paymentStatus: "paid",
    paymentMethod: "Cash",
    deliveryAddress: "Jl. Sudirman 456, Jakarta Selatan",
    deliveryPhone: "+62812345679",
    deliveryDate: "2025-11-14",
    notes: "",
  },
};

const statusSteps = [
  { status: "pending", label: "Order Created", icon: AlertCircle },
  { status: "processing", label: "Being Processed", icon: Clock },
  { status: "ready", label: "Ready for Pickup", icon: CheckCircle },
  { status: "completed", label: "Completed", icon: CheckCircle },
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = mockOrderDetails[orderId];

  if (!order) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl">
          <div className="py-12 text-center">
            <h1 className="font-bold text-2xl text-foreground">
              Order not found
            </h1>
            <p className="mt-2 text-muted-foreground">
              The order you're looking for doesn't exist.
            </p>
            <Link href="/customer/my-orders">
              <Button className="mt-4 bg-transparent" variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusVariants = {
    pending: "secondary",
    processing: "outline",
    ready: "default",
    completed: "default",
  } as const;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/customer/my-orders">
            <Button className="mb-4" size="sm" variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-3xl">Order {order.id}</h1>
              <p className="mt-1 text-muted-foreground">
                Created on{" "}
                {new Date(order.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
            <Badge variant={statusVariants[order.status]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Status Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted =
                  statusSteps.findIndex((s) => s.status === order.status) >=
                  index;
                return (
                  <div className="flex items-center gap-4" key={step.status}>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        isCompleted
                          ? "border-primary bg-primary"
                          : "border-muted"
                      }`}
                    >
                      <StepIcon
                        className={`h-4 w-4 ${isCompleted ? "text-primary-foreground" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                      key={item.id}
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(item.subtotal)}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          @Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>
                    Rp {new Intl.NumberFormat("id-ID").format(order.subtotal)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="text-green-600">
                      -Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(order.discount)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    Rp {new Intl.NumberFormat("id-ID").format(order.total)}
                  </span>
                </div>
                <Separator />
                <div className="pt-2">
                  <p className="mb-1 font-medium text-muted-foreground text-xs">
                    Payment Status
                  </p>
                  <Badge className="w-full justify-center" variant="default">
                    {order.paymentStatus.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="mb-1 font-medium text-muted-foreground text-xs">
                    Payment Method
                  </p>
                  <p className="font-medium text-sm">{order.paymentMethod}</p>
                </div>
                {order.paymentStatus === "pending" && (
                  <Link
                    className="w-full"
                    href={`/customer/my-orders/${orderId}/payment`}
                  >
                    <Button className="w-full">Pay Now</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delivery & Notes */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{order.deliveryAddress}</p>
              <div className="mt-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  {order.deliveryPhone}
                </p>
              </div>
              <p className="mt-3 text-muted-foreground text-sm">
                Expected delivery:{" "}
                {new Date(order.deliveryDate).toLocaleDateString("id-ID")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {order.notes || "No special notes for this order."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
