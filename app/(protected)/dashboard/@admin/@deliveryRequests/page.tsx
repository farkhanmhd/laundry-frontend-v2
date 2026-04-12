import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";

const getBadgeVariant = (
  status: string
): "default" | "secondary" | "outline" | "destructive" => {
  switch (status) {
    case "pending":
    case "requested":
      return "secondary";
    case "processing":
    case "assigned":
      return "default";
    case "ready":
    case "completed":
      return "outline";
    default:
      return "secondary";
  }
};

export default async function DeliveryRequestsSlot() {
  const deliveryRequests = await AdminDashboardApi.getRecentDeliveries();
  const t = await getTranslations("Dashboard.admin.deliveryRequests");

  return (
    <>
      {deliveryRequests.length === 0 ? (
        <p className="py-4 text-center text-muted-foreground text-sm">
          {t("empty")}
        </p>
      ) : (
        deliveryRequests.map((item) => (
          <div
            className="flex items-start justify-between border-border border-b pb-3 last:border-0 last:pb-0"
            key={item.id}
          >
            <div className="grid gap-1">
              <p className="font-medium text-foreground text-sm">
                {item.customer}
              </p>
              <div className="flex items-start gap-1.5 text-muted-foreground text-xs">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-2">{item.address}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  className="h-5 px-1.5 font-normal text-[10px]"
                  variant="secondary"
                >
                  {new Date(item.requestedAt).toLocaleString("id-ID", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Badge>
                <Badge
                  className="h-5 px-2 text-[10px]"
                  variant={getBadgeVariant(item.status)}
                >
                  {item.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
