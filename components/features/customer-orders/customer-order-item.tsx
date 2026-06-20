"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import NumberInput from "@/components/forms/number-input";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/components/utils/client";
import { formatToIDR } from "@/lib/utils";
import { useCustomerOrder } from "./state";

// Define the data type as requested
export interface PosOrderItem {
  id: string;
  image: string;
  name: string;
  price: number;
  stock?: number | null;
  itemType: "service" | "inventory" | "bundling" | "voucher" | "points";
  quantity: number;
  description: string;
  serviceId?: string | null | undefined;
  inventoryId?: string | null | undefined;
  bundlingId?: string | null | undefined;
  voucherId?: string | null | undefined;
  note?: string | null | undefined;
}

interface OrderSummaryItemProps {
  item: PosOrderItem;
}

export function CustomerOrderItem({ item }: OrderSummaryItemProps) {
  const t = useTranslations("CustomerOrders");
  const { handleIncrementQuantity, handleDecrementQuantity, isPending } =
    useCustomerOrder();

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-4">
        {/* Left Column: Text Details */}
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="font-bold text-sm">{item.name}</h3>

          {/* Conditional Note Rendering */}
          {item.note && (
            <div className="text-muted-foreground text-sm">
              <span className="text-foreground">Notes :</span> {item.note}
            </div>
          )}

          <Client>
            <p className="font-medium text-muted-foreground text-sm">
              {formatToIDR(item.price)}
            </p>
          </Client>

          <div className="font-medium text-sm">{item.description}</div>
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
        <Badge className="font-semibold text-xs uppercase">
          {t(`orderSummary.${item.itemType}`)}
        </Badge>

        <div className="flex items-center">
          <NumberInput
            disabled={isPending}
            onDecrement={() => handleDecrementQuantity(item.id)}
            onIncrement={() => handleIncrementQuantity(item.id)}
            value={item.quantity}
          />
        </div>
      </div>
    </div>
  );
}
