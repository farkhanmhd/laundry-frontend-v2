"use client";

import { format } from "date-fns";
import { Coins, Percent, Ticket } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import type { PosVoucher } from "@/lib/modules/pos/data";
import { usePOS } from "@/lib/modules/pos/state";
import { cn, formatToIDR } from "@/lib/utils";

interface VoucherCardProps {
  voucher: PosVoucher;
  isSelected?: boolean;
}

export const PosVoucherCard: React.FC<VoucherCardProps> = ({
  voucher,
  isSelected,
}) => {
  const { handleRemoveVoucher, handleSelectVoucher, totalAmount } = usePOS();

  // Logic: Schema 'one_discount_type_only' check
  const isPercentage = voucher.discountPercentage !== null;
  const amountToMinSpend =
    totalAmount < voucher.minSpend ? voucher.minSpend - totalAmount : 0;

  // Logic: Schema 'percentage_requires_cap' check
  // If it's a percentage, we MUST show the cap (maxDiscountAmount) per schema rules
  const renderMainValue = () => {
    if (isPercentage) {
      // Clean up "20.00" to "20" for display
      const formattedPercent = voucher.discountPercentage
        ? Number.parseFloat(voucher.discountPercentage).toString()
        : "";
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-primary">
            <Percent className="h-5 w-5" />
            <span className="font-bold text-2xl tracking-tight">
              {formattedPercent}% OFF
            </span>
          </div>
          {/* CRITICAL: Schema enforces this exists for percentages */}
          {voucher.maxDiscountAmount && (
            <span className="font-medium text-muted-foreground text-xs">
              Up to {formatToIDR(voucher.maxDiscountAmount)}
            </span>
          )}
        </div>
      );
    }

    // Fallback: Fixed Amount
    if (voucher.discountAmount) {
      return (
        <div className="flex items-center gap-1.5 text-primary">
          <Coins className="h-5 w-5" />
          <span className="font-bold text-2xl tracking-tight">
            {formatToIDR(voucher.discountAmount)} OFF
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 transition-all duration-200",
        "hover:shadow-md",
        isSelected
          ? "border-primary ring-1 ring-primary"
          : "border-border shadow-sm"
      )}
    >
      {/* 1. Header: Code & Expiry */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-1.5 rounded bg-muted/50 px-2 py-1 ring-1 ring-foreground/10 ring-inset">
          <Ticket className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-bold font-mono text-foreground text-xs uppercase tracking-wider">
            {voucher.code}
          </span>
        </div>

        {voucher.expiresAt ? (
          <span className="font-medium text-muted-foreground text-xs">
            Exp: {format(new Date(voucher.expiresAt), "dd MMM yyyy")}
          </span>
        ) : (
          <span className="font-medium text-[10px] text-emerald-600">
            No Expiry
          </span>
        )}
      </div>

      {/* 2. Main Value Area */}
      <div className="mb-2">{renderMainValue()}</div>

      {/* 3. Description */}
      <p className="mb-4 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
        {voucher.description}
      </p>

      {/* 4. Footer: Constraints & Actions */}
      <div className="mt-auto flex items-end justify-between border-t border-dashed pt-3">
        {/* Min Spend Constraint */}
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[10px] text-muted-foreground uppercase">
            Min. Transaction
          </span>
          <span className="font-medium text-foreground text-xs">
            {voucher.minSpend > 0 ? formatToIDR(voucher.minSpend) : "No Limit"}
          </span>
        </div>

        {/* Action Button */}
        {isSelected ? (
          <Button
            className="h-8 px-3 font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveVoucher();
            }}
            size="sm"
            variant="ghost"
          >
            Remove
          </Button>
        ) : (
          <div>
            {amountToMinSpend > 0 ? (
              <Client>
                <p className="text-muted-foreground text-sm">
                  Add {formatToIDR(amountToMinSpend)} more to use this voucher
                </p>
              </Client>
            ) : (
              <Button
                className="h-8 px-4 font-medium shadow-none"
                disabled={totalAmount < voucher.minSpend}
                onClick={() => handleSelectVoucher(voucher)}
                size="sm"
                variant="default"
              >
                Apply
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
