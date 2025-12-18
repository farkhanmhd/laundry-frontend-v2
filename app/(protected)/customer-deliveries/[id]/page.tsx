import { format } from "date-fns";
import {
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  ExternalLink,
  Hash,
  Info,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cardShadowStyle } from "@/lib/utils";

// --- Types ---
type PageProps = {
  params: Promise<{ id: string }>;
};

type DeliveryDetail = {
  id: string;
  type: "pickup" | "dropoff";
  status: "requested" | "assigned" | "in_progress" | "completed" | "cancelled";
  notes: string | null;
  requestedAt: string;
  completedAt: string | null;
  orderId: string;
  address: {
    id: string;
    label: string | null;
    address: string;
    notes: string | null;
    latitude: string | null;
    longitude: string | null;
  };
};

// --- Mock Data ---
async function getDelivery(id: string): Promise<DeliveryDetail> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id,
    type: "pickup",
    status: "assigned", // Tested status
    notes: "Please call when arriving at the security post.",
    requestedAt: new Date().toISOString(),
    completedAt: null,
    orderId: "o-xK9s2",
    address: {
      id: "addr-123",
      label: "Home",
      address: "Jl. Jamin Ginting No. 123, Padang Bulan, Medan",
      notes: "White fence, black gate",
      latitude: "3.5852",
      longitude: "98.6756",
    },
  };
}

// --- Helper: Status Badge ---
const DeliveryStatusBadge = ({
  status,
}: {
  status: DeliveryDetail["status"];
}) => {
  const labels = {
    requested: "Looking for Driver",
    assigned: "Driver Assigned",
    in_progress: "On The Way",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return <AlertTitle>{labels[status]}</AlertTitle>;
};

// --- Helper: Status Description Label ---
const getStatusMessage = (
  status: DeliveryDetail["status"],
  type: DeliveryDetail["type"]
) => {
  switch (status) {
    case "requested":
      return "We are currently looking for a driver nearby.";
    case "assigned":
      return type === "pickup"
        ? "Please wait for our driver to pickup your items."
        : "Driver assigned. We are preparing to send your items.";
    case "in_progress":
      return type === "pickup"
        ? "Driver is on the way to your location for pickup."
        : "Driver is on the way to deliver your clean laundry.";
    case "completed":
      return "This delivery has been completed successfully.";
    case "cancelled":
      return "This delivery request was cancelled.";
    default:
      return "";
  }
};

// --- Main Component ---
export default async function DeliveryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const delivery = await getDelivery(id);

  const isPickup = delivery.type === "pickup";
  const statusMessage = getStatusMessage(delivery.status, delivery.type);

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-background p-6 text-foreground">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="font-bold text-2xl text-foreground tracking-tight">
            Delivery Details
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            View information about your request.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1" style={cardShadowStyle}>
        {/* Main Information Card */}
        <Card className="border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-border/50 border-b px-4 pb-4">
            <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
              <Truck className="h-4 w-4 text-muted-foreground" />
              Delivery Information
            </CardTitle>
          </div>
          <CardContent className="space-y-6">
            <Alert>
              <Info className="h-4 w-4 text-primary" />
              <DeliveryStatusBadge status={delivery.status} />
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>

            {/* Top Grid: 2x2 Layout */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {/* 1. Delivery ID */}
              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Delivery ID
                </span>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground uppercase">
                    {delivery.id}
                  </span>
                </div>
              </div>

              {/* 2. Type */}
              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Type
                </span>
                <div className="flex items-center gap-2">
                  {isPickup ? (
                    <ArrowDownCircle className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ArrowUpCircle className="h-5 w-5 text-primary" />
                  )}
                  <span className="font-medium text-foreground capitalize">
                    {isPickup ? "Pick Up" : "Drop Off"}
                  </span>
                </div>
              </div>

              {/* 3. Order ID */}
              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Order ID
                </span>
                <Link
                  className="group flex w-fit items-center gap-2 uppercase"
                  href={`/customer-orders/${delivery.orderId}`}
                >
                  <Hash className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="font-medium text-foreground underline decoration-muted-foreground/50 decoration-dotted underline-offset-4 transition-colors group-hover:text-primary">
                    {delivery.orderId}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </div>

              {/* 4. Requested Time */}
              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Requested Time
                </span>
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">
                    {format(
                      new Date(delivery.requestedAt),
                      "MMM dd, yyyy, HH:mm"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Selected Address
                </span>
                {delivery.address.label && (
                  <Badge className="font-semibold uppercase" variant="default">
                    {delivery.address.label}
                  </Badge>
                )}
              </div>

              <div className="flex gap-3 rounded-lg border border-border bg-secondary/30 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="font-medium text-foreground text-sm leading-snug">
                    {delivery.address.address}
                  </p>
                  {/* Address Notes (Permanent) */}
                  {delivery.address.notes && (
                    <p className="text-muted-foreground text-xs">
                      Location Note: {delivery.address.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Specific Notes (One-time) */}
              {delivery.notes && (
                <div className="rounded-md border border-border bg-secondary/50 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-primary" />
                    <p className="font-semibold text-foreground text-xs">
                      Instructions for Driver:
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    "{delivery.notes}"
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
