import { getTranslations } from "next-intl/server";
import { DateRangePicker } from "@/components/date/date-range-picker";
import { InventoryMonthlyExportDialog } from "@/components/features/inventories/inventory-monthly-export-dialog";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams>;
}

const InventoryHeader = async (props: Props) => {
  const searchParams = await props.searchParams;
  const dateRange = getDateRange(searchParams);
  const t = await getTranslations("InventoryReports");

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full space-y-2">
        <h1 className="font-semibold text-2xl">{t("title")}</h1>
      </div>
      <div className="flex w-full gap-2 md:w-sm">
        <InventoryMonthlyExportDialog />
        <DateRangePicker dateRange={dateRange} />
      </div>
    </div>
  );
};

export default InventoryHeader;
