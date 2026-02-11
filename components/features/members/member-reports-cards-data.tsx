import { CreditCard, ShoppingCart, UserCheck, Users } from "lucide-react";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ScoreCard } from "@/components/utils/score-card";
import { ScoreCardErrorFallback } from "@/components/utils/score-card-error-fallback";
import { ScoreCardSkeleton } from "@/components/utils/score-card-skeleton";
import {
  MemberReportsApi,
  type MemberReportsQuery,
} from "@/lib/modules/member-reports/data";
import { formatToIDR } from "@/lib/utils";

// ----------------------------------------------------------------------
// 1. The Wrapper (Client Logic)
// ----------------------------------------------------------------------

interface MemberReportsCardWrapperProps {
  children: ReactNode;
}

const MemberReportsCardWrapper = ({
  children,
}: MemberReportsCardWrapperProps) => {
  return (
    <ErrorBoundary FallbackComponent={ScoreCardErrorFallback}>
      <Suspense fallback={<ScoreCardSkeleton />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

// Shared Props
interface MetricProps {
  query: MemberReportsQuery;
}

// ----------------------------------------------------------------------
// 2. Total Customers (No date range needed)
// ----------------------------------------------------------------------

const TotalCustomersContent = async () => {
  const data = await MemberReportsApi.getTotalCustomers();
  return (
    <ScoreCard
      description="All registered members"
      icon={<Users className="h-6 w-6 text-primary" />}
      title="Total Members"
      value={data?.totalCustomers ?? 0}
    />
  );
};

export const TotalCustomersCard = () => {
  return (
    <MemberReportsCardWrapper>
      <TotalCustomersContent />
    </MemberReportsCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 3. Average Order Value
// ----------------------------------------------------------------------

const AverageOrderValueContent = async ({ query }: MetricProps) => {
  const data = await MemberReportsApi.getAverageOrderValue(query);
  return (
    <ScoreCard
      description="Average spent per order"
      icon={<CreditCard className="h-6 w-6 text-primary" />}
      title="Avg. Order Value"
      value={formatToIDR(data?.averageOrderValue ?? 0)}
    />
  );
};

export const AverageOrderValueCard = ({ query }: MetricProps) => {
  return (
    <MemberReportsCardWrapper>
      <AverageOrderValueContent query={query} />
    </MemberReportsCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 4. Active Members
// ----------------------------------------------------------------------

const ActiveMembersContent = async ({ query }: MetricProps) => {
  const data = await MemberReportsApi.getActiveMember(query);
  return (
    <ScoreCard
      description="Members with recent activity"
      icon={<UserCheck className="h-6 w-6 text-primary" />}
      title="Active Members"
      value={data?.activeMembers ?? 0}
    />
  );
};

export const ActiveMembersCard = ({ query }: MetricProps) => {
  return (
    <MemberReportsCardWrapper>
      <ActiveMembersContent query={query} />
    </MemberReportsCardWrapper>
  );
};

// ----------------------------------------------------------------------
// 5. Total Member Orders
// ----------------------------------------------------------------------

const TotalMemberOrdersContent = async ({ query }: MetricProps) => {
  const data = await MemberReportsApi.getTotalMemberOrders(query);
  return (
    <ScoreCard
      description="Orders placed by members"
      icon={<ShoppingCart className="h-6 w-6 text-primary" />}
      title="Total Member Orders"
      value={data?.totalMemberOrders ?? 0}
    />
  );
};

export const TotalMemberOrdersCard = ({ query }: MetricProps) => {
  return (
    <MemberReportsCardWrapper>
      <TotalMemberOrdersContent query={query} />
    </MemberReportsCardWrapper>
  );
};
