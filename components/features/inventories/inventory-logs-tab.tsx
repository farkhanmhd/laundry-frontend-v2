import { getTranslations } from "next-intl/server";
import { InventoryLogsTableSection } from "@/components/features/inventory-reports/report-table-section";
import { InventoriesApi } from "@/lib/modules/inventories/data";

interface Props {
  id: string;
  name: string;
  page?: number;
  rows?: number;
}

export const InventoryLogsTab = async ({ id, name, page, rows }: Props) => {
  const t = await getTranslations("Inventories");
  const data = await InventoriesApi.getInventoryLogs(id, {
    page,
    rows,
  });

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">{`${t("logs.metadataTitle")} - ${name}`}</h2>
      <InventoryLogsTableSection data={data?.logs} total={data?.total} />
    </div>
  );
};

export default InventoryLogsTab;
