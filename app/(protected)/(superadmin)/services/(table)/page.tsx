import { TableView } from "@/components/table/table-view";
import { getServices } from "@/lib/modules/services/data";
import { Suspense } from "react";

const ProductsPage = async () => {
  const services = await getServices();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TableView data={services} />
    </Suspense>
  );
};

export default ProductsPage;
