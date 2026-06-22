import { redirect } from "next/navigation";
import { AdjustmentsContent } from "@/components/features/inventory-reports/adjustments-content";
import { InventoryContent } from "@/components/features/inventory-reports/inventory-content";
import { ReportsTabs } from "@/components/features/inventory-reports/reports-tabs";
import { RestocksContent } from "@/components/features/inventory-reports/restocks-content";
import { UsageContent } from "@/components/features/inventory-reports/usage-content";
import { getCurrentUserData } from "@/lib/modules/auth/session";
import type { InventoryHistoryQueryProps } from "@/lib/search-params";

const ReportsPage = async (props: InventoryHistoryQueryProps) => {
  const userData = await getCurrentUserData();

  if (userData?.role !== "superadmin") {
    redirect("/dashboard");
  }

  return (
    <ReportsTabs
      adjustments={<AdjustmentsContent {...props} />}
      inventory={<InventoryContent />}
      restocks={<RestocksContent {...props} />}
      usage={<UsageContent {...props} />}
    />
  );
};

export default ReportsPage;
