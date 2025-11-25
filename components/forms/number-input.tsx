"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "../ui/button-group";

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
    <ButtonGroup>
      {withLabel && (
        <Label className="font-medium text-foreground text-sm">{label}</Label>
      )}
      <Input
        className="h-8 w-14! font-mono"
        onChange={onInputChange}
        value={value}
      />
      <Button
        aria-label="Decrement"
        onClick={onDecrement}
        size="icon-sm"
        type="button"
        variant="outline"
      >
        <MinusIcon aria-hidden="true" size={12} />
      </Button>

      <Button
        aria-label="Increment"
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
