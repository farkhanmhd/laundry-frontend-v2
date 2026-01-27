"use client";

import { format } from "date-fns"; // Recommended for date formatting
import type React from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn path
import { cn, formatToIDR } from "@/lib/utils"; // Assuming shadcn utils

// The interface provided in the prompt
export interface VoucherData {
  id: string;
  code: string;
  description: string;
  discountAmount: number;
  pointsCost: number;
  expiryDate: string;
}

interface VoucherCardProps extends VoucherData {
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  userBalance?: number; // Added to handle the "insufficient points" logic
}

export const PosVoucherCard: React.FC<VoucherCardProps> = ({
  id,
  code,
  description,
  discountAmount,
  pointsCost,
  expiryDate,
  isSelected,
  onSelect,
  userBalance = 0,
}) => {
  const canAfford = userBalance >= pointsCost;

  return (
    <div
      aria-disabled={!canAfford}
      className={cn(
        "relative flex flex-col gap-2 rounded-lg border p-4 transition-all duration-200",
        "bg-card text-card-foreground shadow-sm",
        isSelected ? "border-primary ring-1 ring-primary" : "border-border"
      )}
    >
      {/* Header: Code and Cost */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg tracking-tight">{code}</h3>
          <p className="text-muted-foreground text-sm">
            Valid until {format(expiryDate, "dd MMM yyyy")}
          </p>
        </div>
        <div className="text-right">
          <span className={cn("font-medium", !canAfford && "text-destructive")}>
            {pointsCost} pts
          </span>
        </div>
      </div>

      {/* Description Body */}
      <div className="text-sm">
        <p className="text-foreground">{description}</p>
        <p className="mt-1 font-medium">Save {formatToIDR(discountAmount)}</p>
      </div>

      {/* Footer / Action Area */}
      <div className="mt-auto flex items-center justify-between">
        {/* Insufficient Points Warning */}
        {canAfford ? (
          /* Spacer for alignment when warning is hidden */
          <span />
        ) : (
          <span className="font-medium text-destructive text-xs">
            Not enough points to redeem
          </span>
        )}

        {/* Shadcn Button */}
        <Button
          className={cn(!canAfford && "text-muted-foreground")}
          disabled={!canAfford}
          variant="link"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
