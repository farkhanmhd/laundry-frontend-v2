import { format, startOfMonth } from "date-fns";
import { getTranslations } from "next-intl/server";
import { OrderStatusChart } from "@/components/features/dashboard/order-status-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminDashboardApi } from "@/lib/modules/admin-dashboard/data";
import {
  cardShadowStyle,
  type DateRangeSearchParams,
  getDateRange,
} from "@/lib/utils";

type Props = {
  searchParams: Promise<DateRangeSearchParams>;
};

const OrderStatusSlot = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const dateRange = getDateRange({
    from: params.from,
    to: params.to,
  });
  const query = {
    from: format(dateRange.from || startOfMonth(new Date()), "dd-MM-yyyy"),
    to: format(dateRange.to || new Date(), "dd-MM-yyyy"),
  };
  const data = await AdminDashboardApi.getOrderStatus(query);
  const t = await getTranslations("Dashboard.superadmin.orderStatus");

  return (
    <Card className="flex flex-col" style={cardShadowStyle}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <OrderStatusChart data={data} />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">{t("footer")}</div>
      </CardFooter>
    </Card>
  );
};

export default OrderStatusSlot;
