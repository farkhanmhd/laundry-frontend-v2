import { BarChart3, Package, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ScoreCard } from "@/components/utils/score-card";
import { ScoreCardErrorFallback } from "@/components/utils/score-card-error-fallback";
import { ScoreCardSkeleton } from "@/components/utils/score-card-skeleton";
import {
  InventoryReportsApi,
  type InventoryReportsQuery,
} from "@/lib/modules/inventory-reports/data";

// ----------------------------------------------------------------------
// 1. The Wrapper (Client Logic)
// ----------------------------------------------------------------------

interface InventoryReportsCardWrapperProps {
  children: ReactNode;
}

const InventoryReportsCardWrapper = ({
  children,
}: InventoryReportsCardWrapperProps) => {
  return (
    <ErrorBoundary FallbackComponent={ScoreCardErrorFallback}>
      <Suspense fallback={<ScoreCardSkeleton />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

// Shared Props
interface MetricProps {
  query: InventoryReportsQuery;
}

// ----------------------------------------------------------------------
// 2. Total Items (No date range needed)
// ----------------------------------------------------------------------

const TotalItemsContent = async () => {
  const t = await getTranslations("InventoryReports.totalItems");
  const data = await InventoryReportsApi.getTotalItems();
  return (
    <ScoreCard
      description={t("description")}
      icon={<Package className="h-6 w-6 text-primary" />}
      title={t("title")}
      value={data?.totalItems ?? 0}
    />
  );
};

export const TotalItemsCard = () => {
  return (
    <InventoryReportsCardWrapper>
      <TotalItemsContent />
    </InventoryReportsCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 4. Total Usage
// ----------------------------------------------------------------------

const TotalUsageContent = async ({ query }: MetricProps) => {
  const t = await getTranslations("InventoryReports.totalUsage");
  const data = await InventoryReportsApi.getTotalUsage(query);
  return (
    <ScoreCard
      description={t("description")}
      icon={<BarChart3 className="h-6 w-6 text-primary" />}
      title={t("title")}
      value={data?.totalUsage ?? 0}
    />
  );
};

export const TotalUsageCard = ({ query }: MetricProps) => {
  return (
    <InventoryReportsCardWrapper>
      <TotalUsageContent query={query} />
    </InventoryReportsCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 5. Average Usage
// ----------------------------------------------------------------------

const AverageUsageContent = async ({ query }: MetricProps) => {
  const t = await getTranslations("InventoryReports.averageUsage");
  const data = await InventoryReportsApi.getAverageUsage(query);
  return (
    <ScoreCard
      description={t("description")}
      icon={<Target className="h-6 w-6 text-primary" />}
      title={t("title")}
      value={data?.averageUsagePerOrder ?? 0}
    />
  );
};

export const AverageUsageCard = ({ query }: MetricProps) => {
  return (
    <InventoryReportsCardWrapper>
      <AverageUsageContent query={query} />
    </InventoryReportsCardWrapper>
  );
};
