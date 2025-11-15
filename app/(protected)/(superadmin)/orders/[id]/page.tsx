import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data based on database schema
const mockOrder = {
  id: "o-abc123",
  status: "processing",
  createdAt: "2024-11-10T10:30:00Z",
  customerName: "John Doe",
  memberId: "c-mem001",
  total: 85_000,
  items: [
    {
      id: "od-item1",
      type: "service",
      name: "Premium Laundry",
      quantity: 5,
      subtotal: 50_000,
    },
    {
      id: "od-item2",
      type: "inventory",
      name: "Stain Remover",
      quantity: 2,
      subtotal: 20_000,
    },
    {
      id: "od-item3",
      type: "service",
      name: "Express Ironing",
      quantity: 3,
      subtotal: 15_000,
    },
  ],
  payment: {
    type: "qris",
    amountPaid: 85_000,
    discountAmount: 5000,
    total: 85_000,
    status: "paid",
    transactionTime: "2024-11-10T10:35:00Z",
  },
  delivery: {
    id: "dlv-001",
    type: "dropoff",
    status: "in_progress",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    notes: "Ring doorbell twice",
    requestedAt: "2024-11-10T10:30:00Z",
    estimatedDelivery: "2024-11-11T15:00:00Z",
  },
  timeline: [
    {
      status: "pending",
      label: "Order Placed",
      time: "2024-11-10T10:30:00Z",
      completed: true,
    },
    {
      status: "processing",
      label: "Payment Confirmed",
      time: "2024-11-10T10:35:00Z",
      completed: true,
    },
    {
      status: "processing",
      label: "Processing",
      time: "2024-11-10T11:00:00Z",
      completed: true,
    },
    {
      status: "ready",
      label: "Ready for Delivery",
      time: null,
      completed: false,
    },
    { status: "completed", label: "Delivered", time: null, completed: false },
  ],
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  ready: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
};

const statusLabels = {
  pending: "Pending",
  processing: "Processing",
  ready: "Ready",
  completed: "Completed",
};

export default function OrderTrackingPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-bold text-3xl text-foreground">Order Tracking</h1>
          <p className="text-muted-foreground">Order ID: {mockOrder.id}</p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-muted-foreground text-sm">
            Status:
          </span>
          <Badge
            className={`${statusColors[mockOrder.status as keyof typeof statusColors]} border`}
          >
            {statusLabels[mockOrder.status as keyof typeof statusLabels]}
          </Badge>
        </div>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
            <CardDescription>Track your order progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockOrder.timeline.map((step, index) => (
                <div className="flex gap-4" key={`${step.label}-${index}}`}>
                  {/* Timeline dot and line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        step.completed
                          ? "border-primary bg-primary"
                          : "border-border bg-muted"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    {index !== mockOrder.timeline.length - 1 && (
                      <div
                        className={`h-12 w-0.5 ${step.completed ? "bg-primary" : "bg-border"}`}
                      />
                    )}
                  </div>

                  {/* Timeline content */}
                  <div className="flex-1 pb-4">
                    <p
                      className={`font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.label}
                    </p>
                    {step.time && (
                      <p className="text-muted-foreground text-sm">
                        {formatDate(step.time)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
                <div
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                  key={item.id}
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-muted-foreground text-sm">
                      Qty: {item.quantity} ×{" "}
                      {Math.ceil(item.subtotal / item.quantity).toLocaleString(
                        "id-ID"
                      )}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium capitalize">
                  {mockOrder.payment.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">
                  Rp{" "}
                  {(
                    mockOrder.payment.total + mockOrder.payment.discountAmount
                  ).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="text-muted-foreground">Discount:</span>
                <span className="font-medium">
                  -Rp {mockOrder.payment.discountAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Total Paid:</span>
                <span className="font-bold text-lg text-primary">
                  Rp {mockOrder.payment.total.toLocaleString("id-ID")}
                </span>
              </div>
              <Badge className="mt-2 w-fit border border-green-200 bg-green-100 text-green-800">
                ✓{" "}
                {mockOrder.payment.status.charAt(0).toUpperCase() +
                  mockOrder.payment.status.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="mb-1 font-medium text-muted-foreground text-sm">
                  Delivery Address
                </p>
                <p className="font-semibold text-foreground">
                  {mockOrder.delivery.address}
                </p>
                {mockOrder.delivery.notes && (
                  <p className="mt-2 text-muted-foreground text-sm">
                    📝 {mockOrder.delivery.notes}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-muted-foreground text-sm">
                    Delivery Type
                  </p>
                  <p className="font-semibold capitalize">
                    {mockOrder.delivery.type}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground text-sm">
                    Status
                  </p>
                  <Badge
                    className={`${statusColors[mockOrder.delivery.status as keyof typeof statusColors]} mt-1 border`}
                  >
                    {mockOrder.delivery.status
                      .replace("_", " ")
                      .charAt(0)
                      .toUpperCase() +
                      mockOrder.delivery.status.replace("_", " ").slice(1)}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="mb-1 font-medium text-muted-foreground text-sm">
                  Estimated Delivery
                </p>
                <p className="font-semibold">
                  {formatDate(mockOrder.delivery.estimatedDelivery)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer Name:</span>
                <span className="font-medium">{mockOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member ID:</span>
                <span className="font-medium">
                  {mockOrder.memberId || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">
                  {formatDate(mockOrder.createdAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Need Help */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="mb-1 font-medium text-foreground">Need help?</p>
                <p className="text-muted-foreground text-sm">
                  Contact our support team at support@laundry.local or call us
                  at <span className="font-semibold">(555) 123-4567</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
