import { DeliveriesItem } from "@/components/features/deliveries/deliveries-item";
import { CustomerDeliveriesApi } from "@/lib/modules/customer-deliveries/data";

const CustomerDeliveriesPage = async () => {
  const deliveries = await CustomerDeliveriesApi.getDeliveries();

  return (
    <>
      {deliveries.map((delivery) => (
        <DeliveriesItem delivery={delivery} key={delivery.id} shadow />
      ))}
    </>
  );
};

export default CustomerDeliveriesPage;
