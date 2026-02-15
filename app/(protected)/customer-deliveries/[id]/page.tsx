import { format } from "date-fns";
import {
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  ExternalLink,
  Info,
  MapPin,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cardShadowStyle } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

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

async function getDelivery(id: string): Promise<DeliveryDetail> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id,
    type: "pickup",
    status: "assigned",
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

const DeliveryStatusBadge = ({
  status,
  t,
}: {
  status: DeliveryDetail["status"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: Translator;
}) => {
  const labels: Record<DeliveryDetail["status"], string> = {
    requested: t("status.requested"),
    assigned: t("status.assigned"),
    in_progress: t("status.in_progress"),
    completed: t("status.completed"),
    cancelled: t("status.cancelled"),
  };

  return <AlertTitle>{labels[status]}</AlertTitle>;
};

const getStatusMessage = (
  status: DeliveryDetail["status"],
  type: DeliveryDetail["type"],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: Translator
) => {
  switch (status) {
    case "requested":
      return t("status.messageRequested");
    case "assigned":
      return type === "pickup"
        ? t("status.messageAssignedPickup")
        : t("status.messageAssignedDropoff");
    case "in_progress":
      return type === "pickup"
        ? t("status.messageInProgressPickup")
        : t("status.messageInProgressDropoff");
    case "completed":
      return t("status.messageCompleted");
    case "cancelled":
      return t("status.messageCancelled");
    default:
      return "";
  }
};

export default async function DeliveryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const t = await getTranslations("CustomerDeliveries.deliveryDetail");
  const delivery = await getDelivery(id);

  const isPickup = delivery.type === "pickup";
  const statusMessage = getStatusMessage(delivery.status, delivery.type, t);

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-background p-6 text-foreground">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="font-bold text-2xl text-foreground tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            {t("description")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1" style={cardShadowStyle}>
        <Card className="border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-border/50 border-b px-4 pb-4">
            <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
              <Truck className="h-4 w-4 text-muted-foreground" />
              {t("deliveryInformation")}
            </CardTitle>
          </div>
          <CardContent className="space-y-6">
            <Alert>
              <Info className="h-4 w-4 text-primary" />
              <DeliveryStatusBadge status={delivery.status} t={t} />
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {t("deliveryId")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm uppercase">
                    {delivery.id}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {t("type")}
                </span>
                <div className="flex items-center gap-2">
                  {isPickup ? (
                    <ArrowDownCircle className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ArrowUpCircle className="h-5 w-5 text-primary" />
                  )}
                  <span className="font-medium text-foreground text-sm capitalize">
                    {isPickup ? t("pickup") : t("delivery")}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {t("orderId")}
                </span>
                <Link
                  className="group flex w-fit items-center gap-2 uppercase"
                  href={`/customer-orders/${delivery.orderId}`}
                >
                  <span className="font-medium text-foreground text-sm underline decoration-muted-foreground/50 decoration-dotted underline-offset-4 transition-colors group-hover:text-primary">
                    {delivery.orderId}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </div>

              <div className="space-y-1.5">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {t("requestedTime")}
                </span>
                <div className="flex items-center gap-2 text-foreground">
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

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {t("selectedAddress")}
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
                  {delivery.address.notes && (
                    <p className="text-muted-foreground text-xs">
                      {t("locationNote")}: {delivery.address.notes}
                    </p>
                  )}
                </div>
              </div>

              {delivery.notes && (
                <div className="rounded-md border border-border bg-secondary/50 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-primary" />
                    <p className="font-semibold text-foreground text-xs">
                      {t("instructionsForDriver")}
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
