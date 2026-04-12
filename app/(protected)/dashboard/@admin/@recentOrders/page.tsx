import { Package } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import { formatDate } from "@/lib/utils";

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

const RecentOrdersSlot = async () => {
  const recentOrders = await AdminDashboardApi.getOrders();

  const getFilteredOrders = (status: string) => {
    if (status === "all") {
      return recentOrders.slice(0, 10);
    }
    return recentOrders.filter((o) => o.status === status).slice(0, 10);
  };

  const t = await getTranslations("Dashboard.admin.recentOrders");

  return (
    <CardContent className="flex-1">
      {["all", "pending", "processing", "ready", "completed"].map((tab) => (
        <TabsContent className="mt-0 space-y-2" key={tab} value={tab}>
          {getFilteredOrders(tab).length === 0 ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground text-sm">
              {t("empty")}
            </div>
          ) : (
            getFilteredOrders(tab).map((order) => (
              <Link
                className="group block"
                href={`/orders/${order.id}`}
                key={order.id}
              >
                <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-primary">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-secondary p-2 text-secondary-foreground transition-colors group-hover:bg-background group-hover:text-primary">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                        {order.customer}
                      </p>
                      <p className="text-muted-foreground text-sm uppercase">
                        {order.id}
                      </p>
                      <p className="mt-1 text-muted-foreground/70 text-sm">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium text-foreground text-sm">
                      Rp {order.total.toLocaleString()}
                    </p>
                    <Badge variant={getBadgeVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))
          )}
        </TabsContent>
      ))}
    </CardContent>
  );
};

export default RecentOrdersSlot;
