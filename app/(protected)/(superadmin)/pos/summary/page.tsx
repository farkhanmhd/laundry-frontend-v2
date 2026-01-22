"use client";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { OrderSummaryVoucher } from "@/components/features/orders/order-summary-voucher";
import { PosCustomerSelection } from "@/components/features/pos/pos-customer-selection";
import { PosEmptySummaryItem } from "@/components/features/pos/pos-empty-summary-item";
import { PosPaymentMethod } from "@/components/features/pos/pos-payment-method";
import { PosSummaryAddMoreItem } from "@/components/features/pos/pos-summary-add-more-item";
import { PosSummaryItem } from "@/components/features/pos/pos-summary-item";
import { Button } from "@/components/ui/button";
import { createPosOrderAction } from "@/lib/modules/pos/actions";
import type { NewOrderSchema } from "@/lib/modules/pos/schema";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";

export default function PosSummaryPage() {
  const { posData, totalItems, clearPosData } = usePOS();
  const { push } = useRouter();
  const { execute, isPending } = useAction(createPosOrderAction, {
    onSuccess: ({ data: result }) => {
      if (result && result.status === "success") {
        toast.success(result.message);
        push(`/orders/${result.data?.orderId}/payment`);
        clearPosData();
      } else {
        toast.error("Failed to create new Order");
      }
    },
  });

  const handleSubmit = () => {
    const baseData = {
      customerName: posData.customerName,
      items: posData.items.map((item) => ({
        itemType: item.itemType,
        quantity: item.quantity,
        serviceId: item.serviceId || null,
        inventoryId: item.inventoryId || null,
        bundlingId: item.bundlingId || null,
        voucherId: item.voucherId || null,
        note: item.note,
      })),
    };

    let payload: NewOrderSchema;

    if (posData.paymentMethod === "cash") {
      payload = {
        ...baseData,
        paymentType: "cash",
        amountPaid: posData.amountPaid,
      };
    } else {
      payload = {
        ...baseData,
        paymentType: "qris",
      };
    }

    execute(payload);
  };

  return (
    <div className="relative mx-auto max-w-3xl space-y-4 p-4">
      <PosCustomerSelection />
      <div className="rounded-xl bg-card" style={cardShadowStyle}>
        <ul className="flex flex-col divide-y divide-solid divide-accent p-4">
          {posData.items.length > 0 ? (
            posData.items.map((item) => (
              <li className="py-4 first:pt-0" key={item.id}>
                <PosSummaryItem item={item} />
              </li>
            ))
          ) : (
            /* Empty State */
            <li>
              <PosEmptySummaryItem />
            </li>
          )}
        </ul>
        {posData.items.length > 0 && <PosSummaryAddMoreItem />}
      </div>
      <OrderSummaryVoucher />
      <PosPaymentMethod />
      <Button
        className="w-full"
        disabled={totalItems === 0 || isPending}
        onClick={handleSubmit}
      >
        Process Payment
      </Button>
    </div>
  );
}
