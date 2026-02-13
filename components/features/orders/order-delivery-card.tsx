import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Bike,
  MapPinOff,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cardShadowStyle, cn } from "@/lib/utils";

type DeliveryStatus = "requested" | "in_progress" | "completed" | "cancelled";

interface DeliveryItem {
  id: string;
  type: "pickup" | "delivery";
  status: "completed" | "requested" | "in_progress" | "cancelled";
  address: string | null;
  label: string | null;
  note: string | null;
}

interface OrderDeliveryCardProps {
  items: DeliveryItem[];
}

export const OrderDeliveryCard = ({ items }: OrderDeliveryCardProps) => {
  const t = useTranslations("Orders.delivery");
  const sortedDeliveries = [...items]
    .sort((a) => (a.type === "pickup" ? -1 : 1))
    .slice(0, 2);

  const getStatusColor = (status: DeliveryStatus) => {
    const colors: Record<DeliveryStatus, string> = {
      requested:
        "text-slate-500 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-900/50 dark:border-slate-800",
      in_progress:
        "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/50 dark:border-blue-800",
      completed:
        "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/50 dark:border-green-800",
      cancelled:
        "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/50 dark:border-red-800",
    };
    return colors[status] || colors.requested;
  };

  const formatStatus = (status: string) => status.replace(/_/g, " ");

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 font-semibold text-base">
          <Bike className="h-4 w-4 text-muted-foreground" />
          {t("logistics")}
        </CardTitle>
        {sortedDeliveries.length > 0 && (
          <Badge
            className="font-normal text-muted-foreground"
            variant="outline"
          >
            {t("legs", { count: sortedDeliveries.length })}
          </Badge>
        )}
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent>
        {sortedDeliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-6 text-center text-muted-foreground">
            <MapPinOff className="h-8 w-8 opacity-50" />
            <div className="font-medium text-sm">{t("noDeliveryInfo")}</div>
            <p className="max-w-[200px] text-xs leading-snug opacity-70">
              {t("noDeliveryDescription")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {sortedDeliveries.map((item, index) => (
              <div className="relative" key={item.id}>
                {index > 0 && <Separator className="absolute -top-3 mb-6" />}

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center font-medium text-foreground text-sm capitalize">
                    {item.type === "pickup" ? (
                      <ArrowUpFromLine className="mr-2 h-3.5 w-3.5 text-orange-500" />
                    ) : (
                      <ArrowDownToLine className="mr-2 h-3.5 w-3.5 text-blue-500" />
                    )}
                    {item.type}
                  </div>

                  <Badge
                    className={cn(
                      "px-2 py-0.5 text-[10px] capitalize shadow-none",
                      getStatusColor(item.status)
                    )}
                    variant="outline"
                  >
                    {formatStatus(item.status)}
                  </Badge>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm">
                      {t("locationLabel")}
                    </span>
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm">
                      {t("address")}
                    </span>
                    <span className="text-foreground text-sm leading-snug">
                      {item.address}
                    </span>
                  </div>

                  {item.note && (
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-sm">
                        {t("note")}
                      </span>
                      <div className="rounded-sm bg-muted px-3 py-2 text-foreground/90 text-sm italic leading-relaxed dark:bg-accent">
                        &quot;{item.note}&quot;
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
