"use client";

import Image from "next/image";
import NumberInput from "@/components/forms/number-input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type PosOrderItem, usePosOrderItem } from "@/lib/modules/pos/state";
import { formatToIDR, MapItems } from "@/lib/utils";

export function PosOrderProducts() {
  const { posItem, setPosItem } = usePosOrderItem();

  const total = posItem.items.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  const handleIncrementQuantity = (itemId: string) => {
    setPosItem({
      ...posItem,
      items: posItem.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  const handleDecrementQuantity = (itemId: string) => {
    setPosItem((currentProducts) => ({
      ...posItem,
      items: currentProducts.items.reduce((newArray, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            newArray.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newArray.push(item);
        }
        return newArray;
      }, [] as PosOrderItem[]),
    }));
  };

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
          <span>{formatToIDR(total)}</span>
        </div>
        <div>
          <Button className="h-12 w-full text-lg">Order Summary</Button>
        </div>
      </footer>
    </>
  );
}
