import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

interface CustomerOrderAddressLayoutProps {
  children: React.ReactNode;
}

const CustomerOrderAddressLayout = async ({
  children,
}: CustomerOrderAddressLayoutProps) => {
  const t = await getTranslations("CustomerOrders.orderSummaryAddress");

  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="border-b">
        <CardTitle>{t("yourAddresses")}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomerOrderAddressLayout;
