import { Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CustomerOrderItem } from "@/lib/modules/customer-orders/data";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";
import { cardShadowStyle, cn, formatToIDR } from "@/lib/utils";

type CustomerOrderItemType = CustomerOrderItem["itemType"];

type OrderDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailItems({ params }: OrderDetailProps) {
  const { id } = await params;
  const t = await getTranslations("CustomerOrders.orderDetail");
  const items = await CustomerOrdersApi.getCustomerOrderItems(id);

  const isItemDiscount = (itemType: CustomerOrderItemType) => {
    const isDiscountItem = ["voucher", "points"].includes(itemType);

    return isDiscountItem;
  };

  return (
    <Card className="shadow-card-shadow" style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Package className="h-5 w-5 text-muted-foreground" />
          {t("orderItems")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div className="rounded-xl border p-3" key={item.id}>
              <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="line-clamp-1 font-semibold text-foreground">
                      {isItemDiscount(item.itemType) ? item.note : item.name}
                    </h4>
                  </div>
                  {!isItemDiscount(item.itemType) && (
                    <p className="text-muted-foreground text-sm">
                      {item.quantity} x {formatToIDR(item.price)}
                    </p>
                  )}
                </div>
                {!isItemDiscount(item.itemType) && !!item.note && (
                  <div className="mt-3 flex items-start gap-2 rounded-md bg-muted/30 p-2 text-muted-foreground text-xs">
                    <span className="italic">"{item.note}"</span>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="font-medium text-sm">{t("subtotal")}</span>
                  <span
                    className={cn("font-bold", {
                      "text-primary": !isItemDiscount(item.itemType),
                      "text-green-600": isItemDiscount(item.itemType),
                    })}
                  >
                    {formatToIDR(item.subtotal)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
