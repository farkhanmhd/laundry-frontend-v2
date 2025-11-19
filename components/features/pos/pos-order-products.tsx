"use client";

import Image from "next/image";
import NumberInput from "@/components/forms/number-input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Client } from "@/components/utils/client";
import { type PosProduct, usePosProducts } from "@/hooks/state";
import { formatToIDR, MapItems } from "@/lib/utils";

export function PosOrderProducts() {
  const { posProduct, setPosProduct } = usePosProducts();

  const total = posProduct.items.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );

  const handleIncrementQuantity = (productId: string) => {
    setPosProduct({
      ...posProduct,
      items: posProduct.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    });
  };

  const handleDecrementQuantity = (productId: string) => {
    setPosProduct((currentProducts) => ({
      ...posProduct,
      items: currentProducts.items.reduce((newArray, item) => {
        if (item.product.id === productId) {
          if (item.quantity > 1) {
            newArray.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newArray.push(item);
        }
        return newArray;
      }, [] as PosProduct[]),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    orderProduct: PosProduct
  ) => {
    // 1. Sanitize the input to get a valid number.
    const newQuantity = Number(e.target.value.replace(/[^0-9]/g, ""));

    // 2. Determine the quantity, ensuring it doesn't exceed the available stock.
    const cappedQuantity = Math.min(newQuantity, orderProduct.product.stock);

    // if (newQuantity === 0) {
    //   setPosProduct((currentProducts) => ({
    //     ...posProduct,
    //     items: currentProducts.items.filter(
    //       (item) => item.product.id !== orderProduct.product.id
    //     ),
    //   }));
    // }

    setPosProduct((currentProducts) => ({
      ...posProduct,
      items: currentProducts.items.map((item) =>
        item.product.id === orderProduct.product.id
          ? { ...item, quantity: cappedQuantity }
          : item
      ),
    }));
  };

  return (
    <>
      <header className="z-50 flex h-20 items-center justify-center">
        <span className="font-semibold text-lg">Cart</span>
      </header>
      <ScrollArea className="h-[calc(100dvh-80px-48px-200px)] flex-1">
        <ul className="flex flex-col divide-y divide-dashed divide-primary/20 px-4">
          {posProduct.items.length === 0 ? (
            <li className="flex h-[133px] items-center justify-center border-b border-dashed text-secondary-foreground/70">
              No Item Selected
            </li>
          ) : (
            <MapItems
              of={posProduct.items}
              render={(item, index) => (
                <li
                  className="flex w-full items-end gap-6 py-4"
                  key={`${item.product.id}-${index}`}
                >
                  <Image
                    alt="Cart item"
                    className="max-h-[100px] rounded-lg object-cover"
                    height={100}
                    src={item.product.image as string}
                    width={150}
                  />
                  <div className="flex w-full flex-col justify-between gap-3">
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">{item.product.name}</span>
                        <span className="text-muted-foreground">
                          <Client>{formatToIDR(item.product.price)}</Client>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="w-30">
                        <NumberInput
                          onDecrement={() =>
                            handleDecrementQuantity(item.product.id)
                          }
                          onIncrement={() =>
                            handleIncrementQuantity(item.product.id)
                          }
                          onInputChange={(e) => handleInputChange(e, item)}
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
          <Client>
            <span>{formatToIDR(total)}</span>
          </Client>
        </div>
        <div className="flex gap-2">
          <Button className="h-10 flex-1 rounded-full" variant="secondary">
            Add Promo or Voucher
          </Button>
          <Button
            className="h-10 flex-1 rounded-full text-base"
            variant="secondary"
          >
            Cash
          </Button>
        </div>
        <div>
          <Button className="h-12 w-full text-lg">Place Order</Button>
        </div>
      </footer>
    </>
  );
}
