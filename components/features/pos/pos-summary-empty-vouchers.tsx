import { Ticket } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const PosSummaryEmptyVouchers = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Ticket className="size-8 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No Vouchers Available</EmptyTitle>
        <EmptyDescription>
          There are currently no vouchers available for this member.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
