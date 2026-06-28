import { Check } from "lucide-react";
import type { Driver } from "@/lib/modules/drivers/data";

interface Props {
  driver: Driver;
  disabled?: boolean;
  onClick: () => void;
}

export const DriverSearchItem = ({ driver, disabled, onClick }: Props) => {
  return (
    <button
      className="group flex w-full items-center justify-between border-border border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-secondary"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-sm">
          {driver.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-card-foreground">
            {driver.name}
          </p>
        </div>
      </div>
      <Check className="ml-2 h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
};
