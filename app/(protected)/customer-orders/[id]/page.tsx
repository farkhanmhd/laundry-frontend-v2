import { format } from "date-fns";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cardShadowStyle, cn, formatToIDR } from "@/lib/utils";

// --- Types based on your Drizzle Schema ---
type OrderDetailProps = {
  params: Promise<{ id: string }>;
};

type Delivery = {
  id: string;
  type: "pickup" | "delivery";
  status: string;
  address: string;
  label: string | null;
  notes?: string | null;
};

type OrderItem = {
  id: string;
  quantity: number;
  subtotal: number;
  note?: string; // Added
  details: {
    name: string;
    price: number;
  };
};

type OrderData = {
  id: string;
  status: "pending" | "processing" | "ready" | "completed";
  createdAt: string;
  customerName: string;
  member?: { name: string; phone: string; points: number };
  items: OrderItem[];
  payment: {
    status: string;
    method: "qris" | "cash";
    total: number;
    amountPaid: number;
    change: number | null;
  };
  deliveries?: Delivery[];
};

// --- Mock Data Fetcher ---
async function getOrder(id: string): Promise<OrderData> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id,
    status: "pending", // Try 'processing', 'ready', 'completed' to see changes
    createdAt: new Date().toISOString(),
    customerName: "Budi Santoso",
    member: { name: "Budi Santoso", phone: "08123456789", points: 150 },
    items: [
      {
        id: "od-123",
        quantity: 5,
        subtotal: 50_000,
        note: "Separate white clothes",
        details: {
          name: "Complete Wash (Wash & Fold)",
          price: 10_000,
        },
      },
      {
        id: "od-124",
        quantity: 1,
        subtotal: 15_000,
        details: {
          name: "Premium Laundry Perfume",
          price: 15_000,
        },
      },
    ],
    payment: {
      status: "pending",
      method: "qris",
      total: 65_000,
      amountPaid: 65_000,
      change: 0,
    },
    deliveries: [
      {
        id: "dlv-1",
        type: "pickup",
        status: "completed",
        address: "Jl. Jamin Ginting No. 123, Medan",
        label: "Home",
        notes: "Laundry bag is at security post",
      },
    ],
  };
}

// --- Helper Component: Improved Order Status Badge ---
const OrderStatusBadge = ({ status }: { status: OrderData["status"] }) => {
  const config = {
    pending: {
      label: "Payment Required",
      variant: "destructive",
    },
    processing: {
      label: "Processing",
      variant: "outline",
    },
    ready: {
      label: "Ready",
      variant: "secondary",
    },
    completed: {
      label: "Completed",
      variant: "default",
    },
  };

  const { label, variant } = config[status] || config.pending;

  return (
    <Badge
      className="font-semibold text-xs uppercase"
      variant={variant as "destructive" | "outline" | "secondary" | "default"}
    >
      {label}
    </Badge>
  );
};

// --- Main Page Component ---

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <will be fixed later>
export default async function OrderDetailPage({ params }: OrderDetailProps) {
  const { id } = await params;
  const order = await getOrder(id);

  // Logic to determine if "Request Delivery" should be shown
  const hasDeliveryRequest = order.deliveries?.some(
    (d) => d.type === "delivery"
  );
  const isOrderCompleted = order.status === "completed";
  const isPendingOrder = order.status === "pending";
  const canRequestDelivery = !(
    isOrderCompleted ||
    isPendingOrder ||
    hasDeliveryRequest
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-foreground text-xl uppercase tracking-tight">
            Order {order.id}
          </h1>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="mt-1 flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="h-4 w-4" />
          {format(new Date(order.createdAt), "MMMM dd, yyyy, HH:mm")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* LEFT COLUMN: Order Items & Status */}
        <div className="space-y-6">
          <Card className="shadow-card-shadow" style={cardShadowStyle}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Package className="h-5 w-5 text-muted-foreground" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div className="rounded-xl border p-3" key={item.id}>
                    {/* 2. ITEM DETAILS */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="line-clamp-1 font-semibold text-foreground">
                              {item.details.name}
                            </h4>
                          </div>
                        </div>

                        {/* PRICE x QUANTITY */}
                        <p className="text-muted-foreground text-sm">
                          {item.quantity} x {formatToIDR(item.details.price)}
                        </p>
                      </div>

                      {/* ITEM NOTE */}
                      {item.note && (
                        <div className="mt-3 flex items-start gap-2 rounded-md bg-muted/30 p-2 text-muted-foreground text-xs">
                          <span className="italic">"{item.note}"</span>
                        </div>
                      )}

                      {/* SUBTOTAL (Mobile Only) */}
                      <div className="mt-3 flex items-center justify-between border-t pt-3">
                        <span className="font-medium text-sm">Subtotal</span>
                        <span className="font-bold text-primary">
                          {formatToIDR(item.subtotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Summary, Payment, Delivery */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card style={cardShadowStyle}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-sidebar-foreground">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium text-sidebar-foreground uppercase">
                  {order.payment?.method || "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                {order.payment?.status === "settlement" ? (
                  <Badge>PAID</Badge>
                ) : (
                  <Badge variant="destructive">UNPAID</Badge>
                )}
              </div>

              {order.payment && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium text-sidebar-foreground">
                      {formatToIDR(order.payment.amountPaid)}
                    </span>
                  </div>
                  {(order.payment.change ?? 0) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Change</span>
                      <span className="font-medium text-sidebar-foreground">
                        {formatToIDR(order.payment.change || 0)}
                      </span>
                    </div>
                  )}
                </>
              )}

              <Separator className="bg-sidebar-border" />

              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-sidebar-foreground">
                  Total
                </span>
                <span className="font-bold text-lg text-primary">
                  {formatToIDR(order.payment?.total || 0)}
                </span>
              </div>

              {/* --- NEW: Payment Button Logic --- */}
              {order.payment && order.payment.status !== "settlement" && (
                <Link
                  className={cn(buttonVariants(), "w-full")}
                  href={`/customer-orders/${order.id}/payment`}
                >
                  Pay Now
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card style={cardShadowStyle}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
                <Truck className="h-4 w-4 text-muted-foreground" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1. LIST OF EXISTING DELIVERIES (Pickup/Dropoff) */}
              {order.deliveries && order.deliveries.length > 0 && (
                <div className="space-y-6">
                  {order.deliveries.map((delivery, index) => (
                    <div key={delivery.id}>
                      {index > 0 && <Separator className="mb-4 bg-border" />}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {delivery.type === "pickup" ? (
                              <ArrowDownCircle className="h-4 w-4 text-chart-2" />
                            ) : (
                              <ArrowUpCircle className="h-4 w-4 text-primary" />
                            )}
                            <span className="font-semibold text-foreground text-sm capitalize">
                              {delivery.type === "pickup"
                                ? "Pick Up"
                                : "Delivery"}
                            </span>
                          </div>
                          <Badge
                            className="bg-secondary text-secondary-foreground text-xs uppercase"
                            variant="secondary"
                          >
                            {delivery.status.replace("_", " ")}
                          </Badge>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="text-sm">
                            <p className="font-medium text-foreground">
                              {delivery.label || "Address"}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {delivery.address}
                            </p>
                            {delivery.notes && (
                              <p className="mt-1 text-muted-foreground text-xs italic">
                                Note: "{delivery.notes}"
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. REQUEST DELIVERY CTA */}
              {/* Show if: Order NOT Completed AND No Delivery Request exists */}
              {canRequestDelivery && (
                <>
                  {/* Add separator if there are items above (like a Pickup) */}
                  {order.deliveries && order.deliveries.length > 0 && (
                    <Separator className="bg-border" />
                  )}

                  <div className="flex flex-col items-center justify-center space-y-4 py-2 text-center">
                    {order.deliveries?.length === 0 && (
                      <div className="rounded-full bg-secondary/50 p-4">
                        <Truck className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {order.status === "ready"
                          ? "Ready for Delivery"
                          : "Home Delivery"}
                      </p>
                      <p className="mx-auto max-w-xs text-muted-foreground text-sm">
                        {order.status === "ready"
                          ? "Your items are ready. Request a delivery driver now?"
                          : "Request delivery now and we will assign a driver once your order is ready."}
                      </p>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Request Delivery
                    </Button>
                  </div>
                </>
              )}

              {/* 3. EMPTY STATE (Completed orders with no history) */}
              {order.deliveries?.length === 0 && isOrderCompleted && (
                <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
                  <div className="rounded-full bg-secondary/50 p-4">
                    <Truck className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      No delivery details
                    </p>
                    <p className="mx-auto max-w-xs text-muted-foreground text-sm">
                      This order was completed without delivery services.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
