import { CircleDollarSign, CreditCard, Receipt, Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ScoreCard } from "@/components/utils/score-card";
import { ScoreCardErrorFallback } from "@/components/utils/score-card-error-fallback";
import { ScoreCardSkeleton } from "@/components/utils/score-card-skeleton";
import { SalesApi, type SalesQuery } from "@/lib/modules/sales/data";
import { formatToIDR } from "@/lib/utils";

// ----------------------------------------------------------------------
// 1. The Wrapper (Client Logic)
// ----------------------------------------------------------------------

interface ScoreCardWrapperProps {
  children: ReactNode;
}

const ScoreCardWrapper = ({ children }: ScoreCardWrapperProps) => {
  return (
    <ErrorBoundary FallbackComponent={ScoreCardErrorFallback}>
      <Suspense fallback={<ScoreCardSkeleton />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

// Shared Props
interface MetricProps {
  query: SalesQuery;
}

// ----------------------------------------------------------------------
// 2. Net Revenue
// ----------------------------------------------------------------------

// Internal Async Component (Fetcher)
const NetRevenueContent = async ({ query }: MetricProps) => {
  const t = await getTranslations("Sales");
  const data = await SalesApi.getNetRevenue(query);
  return (
    <ScoreCard
      description={t("cards.netRevenueDescription")}
      icon={<Wallet className="h-6 w-6 text-primary" />}
      title={t("cards.netRevenue")}
      value={formatToIDR(data?.value ?? 0)}
    />
  );
};

// Exported Wrapped Component
export const NetRevenueCard = ({ query }: MetricProps) => {
  return (
    <ScoreCardWrapper>
      <NetRevenueContent query={query} />
    </ScoreCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 3. Gross Revenue
// ----------------------------------------------------------------------

const GrossRevenueContent = async ({ query }: MetricProps) => {
  const t = await getTranslations("Sales");
  const data = await SalesApi.getGrossRevenue(query);
  return (
    <ScoreCard
      description={t("cards.grossRevenueDescription")}
      icon={<CircleDollarSign className="h-6 w-6 text-primary" />}
      title={t("cards.grossRevenue")}
      value={formatToIDR(data?.value ?? 0)}
    />
  );
};

export const GrossRevenueCard = ({ query }: MetricProps) => {
  return (
    <ScoreCardWrapper>
      <GrossRevenueContent query={query} />
    </ScoreCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 4. Transaction Count
// ----------------------------------------------------------------------

const TransactionCountContent = async ({ query }: MetricProps) => {
  const t = await getTranslations("Sales");
  const data = await SalesApi.getTotalTransactions(query);
  return (
    <ScoreCard
      description={t("cards.totalTransactionsDescription")}
      icon={<Receipt className="h-6 w-6 text-primary" />}
      title={t("cards.totalTransactions")}
      value={data?.count ?? 0}
    />
  );
};

export const TransactionCountCard = ({ query }: MetricProps) => {
  return (
    <ScoreCardWrapper>
      <TransactionCountContent query={query} />
    </ScoreCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 5. Average Order Value
// ----------------------------------------------------------------------

const AverageValueContent = async ({ query }: MetricProps) => {
  const t = await getTranslations("Sales");
  const data = await SalesApi.getAverageOrderValue(query);
  return (
    <ScoreCard
      description={t("cards.averageOrderValueDescription")}
      icon={<CreditCard className="h-6 w-6 text-primary" />}
      title={t("cards.averageOrderValue")}
      value={formatToIDR(data?.value ?? 0)}
    />
  );
};

export const AverageValueCard = ({ query }: MetricProps) => {
  return (
    <ScoreCardWrapper>
      <AverageValueContent query={query} />
    </ScoreCardWrapper>
  );
};
