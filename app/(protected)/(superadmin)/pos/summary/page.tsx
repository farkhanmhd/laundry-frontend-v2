import { OrderSummaryVoucher } from "@/components/features/orders/order-summary-voucher";
import { PosCustomerSelection } from "@/components/features/pos/pos-customer-selection";
import { PosPaymentMethod } from "@/components/features/pos/pos-payment-method";
import { PosSummaryItemList } from "@/components/features/pos/pos-summary-item-list";
import { PosSummarySubmitButton } from "@/components/features/pos/pos-summary-submit-button";

export default function PosSummaryPage() {
  return (
    <div className="relative mx-auto max-w-3xl space-y-4 p-4">
      <PosCustomerSelection />
      <PosSummaryItemList />
      <OrderSummaryVoucher />
      <PosPaymentMethod />
      <PosSummarySubmitButton />
    </div>
  );
}
