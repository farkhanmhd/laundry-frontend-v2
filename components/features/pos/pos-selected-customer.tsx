import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PosCustomer } from "@/lib/modules/pos/state";

interface Props {
  customer: PosCustomer;
  onClick: () => void;
}

export const PosSelectedCustomer = ({ customer, onClick }: Props) => {
  const t = useTranslations("POS");
  const tSelected = useTranslations("POS.selectedCustomer");

  return (
    <div className="fade-in slide-in-from-top-2 flex animate-in items-start justify-between gap-3 rounded-lg border border-primary p-4 duration-300">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-sm">
          {customer.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-card-foreground text-sm">
            {customer.name}
          </p>
          <p className="text-muted-foreground text-sm">{customer.phone}</p>
          <p className="text-sm">
            {customer.points} {tSelected("points")}
          </p>
        </div>
      </div>
      <button
        aria-label={t("clearSelection")}
        className="ml-2 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-card-foreground"
        onClick={onClick}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
