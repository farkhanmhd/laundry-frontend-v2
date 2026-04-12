import { MapPin, Truck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardShadowStyle, cn } from "@/lib/utils";

export default async function QuickActionsSlot() {
  const t = await getTranslations("Dashboard.user.quickActions");
  return (
    <Card className="gap-3" style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="font-semibold text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex h-24 flex-col items-center justify-center gap-2 border-2 text-primary transition-all hover:border-primary/30 hover:bg-primary/10"
            )}
            href="/customer-orders/new"
          >
            <Truck className="h-6 w-6" />
            <span className="font-semibold text-xs">{t("newOrder")}</span>
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex h-24 flex-col items-center justify-center gap-2 border-2 text-primary transition-all hover:border-primary/30 hover:bg-primary/10"
            )}
            href="/account#address"
          >
            <MapPin className="h-6 w-6" />
            <span className="font-semibold text-xs">{t("manageAddress")}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
