"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  withLabel?: boolean;
  label?: string;
  value: number;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function NumberInput({
  withLabel,
  label = "label",
  value = 0,
  onInputChange,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <div className="flex items-center rounded-full bg-secondary p-1">
      {withLabel && (
        <Label className="font-medium text-foreground text-sm">{label}</Label>
      )}
      <Button
        className="flex aspect-square h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-background text-muted-foreground/80 text-sm shadow-none transition-[color,box-shadow] hover:bg-background/60 hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onDecrement}
        slot="decrement"
      >
        <MinusIcon aria-hidden="true" size={12} />
      </Button>
      <Input
        className="w-full grow border-none bg-transparent px-0 py-2 text-center text-foreground tabular-nums shadow-none focus-visible:border-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none dark:bg-secondary"
        onChange={onInputChange}
        value={value}
      />
      <Button
        className="flex aspect-square h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-background text-muted-foreground/80 text-sm shadow-none transition-[color,box-shadow] hover:bg-background/60 hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onIncrement}
        slot="increment"
      >
        <PlusIcon aria-hidden="true" size={12} />
      </Button>
    </div>
  );
}
