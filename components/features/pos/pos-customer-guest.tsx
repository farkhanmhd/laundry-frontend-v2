"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePOS } from "@/lib/modules/pos/state";

export const PosCustomerGuest = () => {
  const t = useTranslations("POS.guestCustomer");
  const tPOS = useTranslations("POS");
  const { customerNameValidation, handleCustomerNameChange, posData } =
    usePOS();
  return (
    <div className="space-y-3">
      <div>
        <Label
          className="mb-2 block font-semibold text-card-foreground"
          htmlFor="customer-name"
        >
          {t("customerName")}
        </Label>
        <p className="mb-3 text-muted-foreground text-sm">
          {t("customerNameDescription")}
        </p>
      </div>

      <Input
        aria-invalid={customerNameValidation}
        autoComplete="off"
        autoFocus
        id="customer-name"
        onChange={(e) => {
          handleCustomerNameChange(e.target.value);
        }}
        placeholder={t("customerNamePlaceholder")}
        value={posData.customerName}
      />
      {customerNameValidation && (
        <span className="text-destructive text-sm">
          {t("customerNameValidation")}
        </span>
      )}

      {posData.customerName && (
        <div className="fade-in slide-in-from-top-2 flex animate-in items-start justify-between gap-3 rounded-lg border border-primary bg-linear-to-r from-accent/5 to-accent/10 p-4 duration-300">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground text-sm uppercase">
              {posData.customerName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-card-foreground text-sm">
                {posData.customerName}
              </p>
              <p className="text-muted-foreground text-xs">{t("guestType")}</p>
            </div>
          </div>
          <button
            aria-label={tPOS("clearInput")}
            className="ml-2 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-card-foreground"
            onClick={() => handleCustomerNameChange("")}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
