import Image from "next/image";
import NumberInput from "@/components/forms/number-input";
import {
  type PosOrderItem as PosOrderItemType,
  usePOS,
} from "@/lib/modules/pos/state";
import { formatToIDR } from "@/lib/utils";

type Props = {
  item: PosOrderItemType;
};

export function PosOrderItem({ item }: Props) {
  const { handleIncrementQuantity, handleDecrementQuantity } = usePOS();
  return (
    <div className="flex w-full items-end gap-6 py-4">
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
    </div>
  );
}
