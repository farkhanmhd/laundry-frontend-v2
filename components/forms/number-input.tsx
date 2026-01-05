"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "../ui/button-group";

interface Props {
  withLabel?: boolean;
  label?: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function NumberInput({
  withLabel,
  label = "label",
  value = 0,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <ButtonGroup>
      {withLabel && (
        <Label className="font-medium text-foreground text-sm">{label}</Label>
      )}
      <Button
        aria-label="Decrement"
        className="h-7.5"
        onClick={onDecrement}
        size="icon-sm"
        type="button"
        variant="outline"
      >
        <MinusIcon aria-hidden="true" size={12} />
      </Button>
      <Input
        className="h-7.5 w-13! text-center font-mono focus-visible:border-input focus-visible:ring-0"
        readOnly
        value={value}
      />
      <Button
        aria-label="Increment"
        className="h-7.5"
        onClick={onIncrement}
        size="icon-sm"
        type="button"
        variant="outline"
      >
        <PlusIcon aria-hidden="true" size={12} />
      </Button>
    </ButtonGroup>
  );
}
