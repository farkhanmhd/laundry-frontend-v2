import { MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CustomerOrderSummaryAddress } from "@/components/features/customer-orders/customer-order-summary-address";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AccountApi } from "@/lib/modules/account/data";

const CustomerOrderAddress = async () => {
  const t = await getTranslations("CustomerOrders.orderSummaryAddress");
  const addresses = await AccountApi.getAddresses();

  if (!addresses || addresses.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <MapPin className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle>{t("noSavedAddresses")}</EmptyTitle>
        <EmptyDescription>{t("addAddressForPickup")}</EmptyDescription>
        <Link href="/account">
          <EmptyDescription className="cursor-pointer text-primary">
            <span className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {t("addNewAddress")}
            </span>
          </EmptyDescription>
        </Link>
      </Empty>
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <CustomerOrderSummaryAddress address={address} key={address.id} />
      ))}
    </div>
  );
};

export default CustomerOrderAddress;
