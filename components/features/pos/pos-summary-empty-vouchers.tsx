import { Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const PosSummaryEmptyVouchers = () => {
  const t = useTranslations("POS.summaryEmptyVouchers");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Ticket className="size-8 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>{t("noVouchersAvailable")}</EmptyTitle>
        <EmptyDescription>{t("noVouchersDescription")}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
