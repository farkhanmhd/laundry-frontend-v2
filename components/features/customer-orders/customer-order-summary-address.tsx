"use client";

import { NotepadText, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cardShadowStyle } from "@/lib/utils";

interface OrderSummaryAddressProps {
  /**
   * Label displayed above the location name (e.g. "Pickup location")
   */
  label?: string;
  /**
   * The name of the location (e.g. "Office", "Home")
   */
  name: string;
  /**
   * The actual address string
   */
  address: string;
  /**
   * Handler for the "Change location" button
   */
  onChangeLocation?: () => void;
  /**
   * Handler for the "Edit address details" button
   */
  onEditAddress?: () => void;
  /**
   * Handler for the "Notes" button
   */
  onNotes?: () => void;
}

export function CustomerOrderSummaryAddress({
  label,
  name,
  address,
  onChangeLocation,
  onEditAddress,
  onNotes,
}: OrderSummaryAddressProps) {
  const t = useTranslations("CustomerOrders");
  return (
    <div className="w-full rounded-xl bg-card p-6" style={cardShadowStyle}>
      <div className="flex items-start justify-between gap-4">
        {/* Address Info */}
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground text-xs">
            {label || t("orderSummaryAddress.label")}
          </p>
          <h3 className="font-semibold tracking-tight">{name}</h3>
          <p className="text-muted-foreground text-sm">{address}</p>
        </div>

        {/* Change Location Button */}
        <Button
          className="shrink-0 bg-background"
          onClick={onChangeLocation}
          variant="outline"
        >
          {t("orderSummaryAddress.changeLocation")}
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          className="font-medium"
          onClick={onEditAddress}
          variant="outline"
        >
          <Pencil className="h-4 w-4" />
          {t("orderSummaryAddress.editAddressDetails")}
        </Button>

        <Button className="font-medium" onClick={onNotes} variant="outline">
          <NotepadText className="h-4 w-4" />
          {t("orderSummaryAddress.notes")}
        </Button>
      </div>
    </div>
  );
}
