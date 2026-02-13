import { getTranslations } from "next-intl/server";
import { DateRangePicker } from "@/components/date/date-range-picker";
import { type DateRangeSearchParams, getDateRange } from "@/lib/utils";

interface Props {
  searchParams: Promise<DateRangeSearchParams>;
}

const SalesHeader = async (props: Props) => {
  const t = await getTranslations("Sales");
  const searchParams = await props.searchParams;
  const dateRange = getDateRange(searchParams);
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full space-y-2">
        <h1 className="font-semibold text-2xl">{t("title")}</h1>
      </div>
      <div className="w-full md:w-sm">
        <DateRangePicker dateRange={dateRange} />
      </div>
    </div>
  );
};

export default SalesHeader;
