"use client";

import { NotepadText } from "lucide-react";
import Image from "next/image";
import NumberInput from "@/components/forms/number-input";
import { Button } from "@/components/ui/button";
import { usePOS } from "@/lib/modules/pos/state";

// Define the data type as requested
export interface PosOrderItem {
  id: string;
  image: string;
  name: string;
  price: number;
  stock?: number | null;
  itemType: "service" | "inventory" | "bundling" | "voucher";
  quantity: number;
  serviceId?: string | null | undefined;
  inventoryId?: string | null | undefined;
  bundlingId?: string | null | undefined;
  voucherId?: string | null | undefined;
  note?: string | null | undefined;
}

interface OrderSummaryItemProps {
  item: PosOrderItem;
}

export function PosSummaryItem({ item }: OrderSummaryItemProps) {
  const { handleIncrementQuantity, handleDecrementQuantity } = usePOS();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-4">
        {/* Left Column: Text Details */}
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="font-medium text-sm">{item.name}</h3>

          {/* Conditional Note Rendering */}
          {item.note && (
            <div className="text-muted-foreground text-sm">
              <span className="font-semibold text-foreground">Notes :</span>{" "}
              {item.note}
            </div>
          )}

          <p className="font-medium text-muted-foreground text-sm">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="shrink-0">
          <Image
            alt={item.name}
            className="h-20 w-20 rounded-lg bg-muted object-cover"
            height={80}
            src={item.image}
            width={80}
          />
        </div>
      </div>

      {/* Bottom Row: Actions */}
      <div className="mt-4 flex items-center justify-between">
        <Button
          className="h-8"
          // onClick={onNoteClick}
          size="sm"
          variant="outline"
        >
          <NotepadText />
          Notes
        </Button>

        <div className="flex items-center">
          <NumberInput
            onDecrement={() => handleDecrementQuantity(item.id)}
            onIncrement={() => handleIncrementQuantity(item.id)}
            value={item.quantity}
          />
        </div>
      </div>
    </div>
  );
}
