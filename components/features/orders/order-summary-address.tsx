"use client";

import { NotepadText, Pencil } from "lucide-react";
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

export function OrderSummaryAddress({
  label = "Pickup location",
  name,
  address,
  onChangeLocation,
  onEditAddress,
  onNotes,
}: OrderSummaryAddressProps) {
  return (
    <div className="w-full rounded-xl bg-card p-6" style={cardShadowStyle}>
      <div className="flex items-start justify-between gap-4">
        {/* Address Info */}
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground text-xs">{label}</p>
          <h3 className="font-semibold tracking-tight">{name}</h3>
          <p className="text-muted-foreground text-sm">{address}</p>
        </div>

        {/* Change Location Button */}
        <Button
          className="shrink-0 bg-background"
          onClick={onChangeLocation}
          variant="outline"
        >
          Change location
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
          Edit address details
        </Button>

        <Button className="font-medium" onClick={onNotes} variant="outline">
          <NotepadText className="h-4 w-4" />
          Notes
        </Button>
      </div>
    </div>
  );
}
