import { CustomerOrderSummaryAddressSkeleton } from "@/components/features/customer-orders/customer-order-summary-address-skeleton";

const AddressLoading = () => {
  return (
    <div className="space-y-3">
      <CustomerOrderSummaryAddressSkeleton />
      <CustomerOrderSummaryAddressSkeleton />
    </div>
  );
};

export default AddressLoading;
