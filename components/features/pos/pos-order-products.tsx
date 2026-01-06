"use client";

import Image from "next/image";
import Link from "next/link";
import NumberInput from "@/components/forms/number-input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePosOrderItem } from "@/lib/modules/pos/state";
import { cn, formatToIDR, MapItems } from "@/lib/utils";

export function PosOrderProducts() {
  const {
    posItem,
    totalAmount,
    handleIncrementQuantity,
    handleDecrementQuantity,
    totalItems
  } = usePosOrderItem();

  return (
    <>
      <header className="z-50 flex h-20 items-center justify-center">
        <span className="font-semibold text-lg">Cart</span>
      </header>
      <ScrollArea className="h-[calc(100dvh-72px-200px)] flex-1">
        <ul className="flex flex-col divide-y divide-dashed divide-primary/20 px-4">
          {posItem.items.length === 0 ? (
            <li className="flex h-[133px] items-center justify-center border-b border-dashed text-secondary-foreground/70">
              No Item Selected
            </li>
          ) : (
            <MapItems
              of={posItem.items}
              render={(item, index) => (
                <li
                  className="flex w-full items-end gap-6 py-4"
                  key={`${item.id}-${index}`}
                >
                  <Image
                    alt="Cart item"
                    className="max-h-[100px] rounded-lg object-cover"
                    height={100}
                    src={item.image as string}
                    width={150}
                  />
                  <div className="flex w-full flex-col justify-between gap-3">
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">
                          {formatToIDR(item.price)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="w-30">
                        <NumberInput
                          onDecrement={() => handleDecrementQuantity(item.id)}
                          onIncrement={() => handleIncrementQuantity(item.id)}
                          value={item.quantity}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )}
            />
          )}
        </ul>
      </ScrollArea>
      <footer className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatToIDR(totalAmount)}</span>
        </div>
        <div>
          <Button className="w-full h-12 items-center px-0" disabled={totalItems === 0}>
            <Link
              href="/pos/summary"
              className="h-12 w-full text-lg flex items-center justify-center"
            >
              Order Summary
            </Link>

          </Button>
        </div>
      </footer>
    </>
  );
}
