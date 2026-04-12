import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { AccountAddress } from "@/lib/modules/account/data";
import { cn } from "@/lib/utils";
import { useCustomerOrderAddress } from "./state";

export const CustomerOrderAddress = ({
  address,
}: {
  address: AccountAddress;
}) => {
  const t = useTranslations("CustomerOrders.orderSummaryAddress");
  const { selectedAddress, setSelectedAddress, isPending } =
    useCustomerOrderAddress();

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border p-3 transition-colors",
        selectedAddress === address.id && "border-primary"
      )}
      key={address.id}
    >
      <div className="flex items-center gap-3">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="font-medium">{address.label}</p>
          <p className="text-muted-foreground text-sm">{address.street}</p>
          {address.note && (
            <p className="text-muted-foreground text-xs">
              {t("notes")}: {address.note}
            </p>
          )}
        </div>
      </div>
      {selectedAddress !== address.id && (
        <Button
          disabled={isPending}
          onClick={() => setSelectedAddress(address.id)}
          size="sm"
        >
          {t("select")}
        </Button>
      )}
      {selectedAddress === address.id && (
        <Button
          className="bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
          disabled={isPending}
          onClick={() => setSelectedAddress(null)}
          size="sm"
          variant="ghost"
        >
          {t("cancel")}
        </Button>
      )}
    </div>
  );
};
