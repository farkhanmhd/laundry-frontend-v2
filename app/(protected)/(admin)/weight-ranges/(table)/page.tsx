import { Suspense } from "react";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { TableView } from "@/components/table/table-view";
import { WeightRangesApi } from "@/lib/modules/weight-ranges/data";

const WeightRangesPage = async () => {
  const data = await WeightRangesApi.getAll();
  const rows = data?.map((item) => ({ ...item, id: String(item.id) })) ?? [];
  return (
    <Suspense fallback={<TableSkeleton />}>
      <TableView data={rows} />
    </Suspense>
  );
};

export default WeightRangesPage;
