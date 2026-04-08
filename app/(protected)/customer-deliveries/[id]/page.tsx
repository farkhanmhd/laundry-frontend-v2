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
import { CustomerDeliveriesApi } from "@/lib/modules/customer-deliveries/data";
import { cardShadowStyle } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

type DeliveryDetail = Awaited<
  ReturnType<typeof CustomerDeliveriesApi.getDeliveryById>
>;

const DeliveryStatusBadge = ({
  status,
  t,
}: {
  status: DeliveryDetail["status"];
  t: Translator;
}) => {
  const labels: Record<DeliveryDetail["status"], string> = {
    requested: t("status.requested"),
    in_progress: t("status.in_progress"),
    picked_up: t("status.picked_up"),
    completed: t("status.completed"),
    cancelled: t("status.cancelled"),
  };

  return <AlertTitle>{labels[status]}</AlertTitle>;
};

const getStatusMessage = (
  status: DeliveryDetail["status"],
  type: DeliveryDetail["type"],
  t: Translator
) => {
  switch (status) {
    case "requested":
      return t("status.messageRequested");
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
  const delivery = await CustomerDeliveriesApi.getDeliveryById(id);

  const isPickup = delivery.type === "pickup";
  const statusMessage = getStatusMessage(delivery.status, delivery.type, t);

  return (
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
              {delivery.addressLabel && (
                <Badge className="font-semibold uppercase" variant="default">
                  {delivery.addressLabel}
                </Badge>
              )}
            </div>

            <div className="flex gap-3 rounded-lg border border-border bg-secondary/30 p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="space-y-1">
                <p className="font-medium text-foreground text-sm leading-snug">
                  {delivery.address}
                </p>
                {delivery.addressNotes && (
                  <p className="text-muted-foreground text-xs">
                    {t("locationNote")}: {delivery.addressNotes}
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
  );
}
