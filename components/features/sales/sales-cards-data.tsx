import { CircleDollarSign, CreditCard, Receipt, Wallet } from "lucide-react";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SalesApi, type SalesQuery } from "@/lib/modules/sales/data";
import { formatToIDR } from "@/lib/utils";
import { SalesCard } from "./sales-card";
import { SalesCardErrorFallback } from "./sales-card-error-fallback";
import { SalesCardSkeleton } from "./sales-card-skeleton";

// ----------------------------------------------------------------------
// 1. The Wrapper (Client Logic)
// ----------------------------------------------------------------------

interface SalesCardWrapperProps {
  children: ReactNode;
}

const SalesCardWrapper = ({ children }: SalesCardWrapperProps) => {
  return (
    <ErrorBoundary FallbackComponent={SalesCardErrorFallback}>
      <Suspense fallback={<SalesCardSkeleton />}>{children}</Suspense>
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
  const data = await SalesApi.getNetRevenue(query);
  return (
    <SalesCard
      description="Actual money received"
      icon={<Wallet className="h-6 w-6 text-primary" />}
      title="Net Revenue"
      value={formatToIDR(data?.value ?? 0)}
    />
  );
};

// Exported Wrapped Component
export const NetRevenueCard = ({ query }: MetricProps) => {
  return (
    <SalesCardWrapper>
      <NetRevenueContent query={query} />
    </SalesCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 3. Gross Revenue
// ----------------------------------------------------------------------

const GrossRevenueContent = async ({ query }: MetricProps) => {
  const data = await SalesApi.getGrossRevenue(query);
  return (
    <SalesCard
      description="Total value before discounts"
      icon={<CircleDollarSign className="h-6 w-6 text-primary" />}
      title="Gross Revenue"
      value={formatToIDR(data?.value ?? 0)}
    />
  );
};

export const GrossRevenueCard = ({ query }: MetricProps) => {
  return (
    <SalesCardWrapper>
      <GrossRevenueContent query={query} />
    </SalesCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 4. Transaction Count
// ----------------------------------------------------------------------

const TransactionCountContent = async ({ query }: MetricProps) => {
  const data = await SalesApi.getTotalTransactions(query);
  return (
    <SalesCard
      description="Completed orders"
      icon={<Receipt className="h-6 w-6 text-primary" />}
      title="Total Transactions"
      value={data?.count ?? 0}
    />
  );
};

export const TransactionCountCard = ({ query }: MetricProps) => {
  return (
    <SalesCardWrapper>
      <TransactionCountContent query={query} />
    </SalesCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 5. Average Order Value
// ----------------------------------------------------------------------

const AverageValueContent = async ({ query }: MetricProps) => {
  const data = await SalesApi.getAverageOrderValue(query);
  return (
    <SalesCard
      description="Average per transaction"
      icon={<CreditCard className="h-6 w-6 text-primary" />}
      title="Avg. Order Value"
      value={formatToIDR(data?.value ?? 0)}
    />
  );
};

export const AverageValueCard = ({ query }: MetricProps) => {
  return (
    <SalesCardWrapper>
      <AverageValueContent query={query} />
    </SalesCardWrapper>
  );
};
