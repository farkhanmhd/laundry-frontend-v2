import { Suspense } from "react";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { TableView } from "@/components/table/table-view";
import { ServicesApi } from "@/lib/modules/services/data";

const ProductsPage = async () => {
  const services = await ServicesApi.getServices();
  return (
    <Suspense fallback={<TableSkeleton />}>
      <TableView data={services} />
    </Suspense>
  );
};

export default ProductsPage;
