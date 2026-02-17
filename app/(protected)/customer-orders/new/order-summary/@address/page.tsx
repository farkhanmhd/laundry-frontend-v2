"use client";

import { useTranslations } from "next-intl";
import { CustomerOrderSummaryAddress } from "@/components/features/customer-orders/customer-order-summary-address";

const CustomerOrderAddress = () => {
  const t = useTranslations("CustomerOrders");
  return (
    <CustomerOrderSummaryAddress
      address="Jalan Adam Malik No. 1"
      label={t("orderSummary.pickupLocation")}
      name="Office"
      onChangeLocation={() => console.log("Change location clicked")}
      onEditAddress={() => console.log("Edit clicked")}
      onNotes={() => console.log("Notes clicked")}
    />
  );
};

export default CustomerOrderAddress;
