import { CreditCard, ShoppingCart, UserCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("Members");
  return (
    <ScoreCard
      description={t("totalMembers.description")}
      icon={<Users className="h-6 w-6 text-primary" />}
      title={t("totalMembers.title")}
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
  const t = await getTranslations("Members");
  return (
    <ScoreCard
      description={t("averageOrderValue.description")}
      icon={<CreditCard className="h-6 w-6 text-primary" />}
      title={t("averageOrderValue.title")}
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
  const t = await getTranslations("Members");
  return (
    <ScoreCard
      description={t("activeMembers.description")}
      icon={<UserCheck className="h-6 w-6 text-primary" />}
      title={t("activeMembers.title")}
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
  const t = await getTranslations("Members");
  return (
    <ScoreCard
      description={t("totalMemberOrders.description")}
      icon={<ShoppingCart className="h-6 w-6 text-primary" />}
      title={t("totalMemberOrders.title")}
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
