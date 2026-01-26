"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePOS } from "@/lib/modules/pos/state";

const customerTypeOptions = ["guest", "member"] as const;

export const PosCustomerTypeSelection = () => {
  const { customerType, handleCustomerTypeChange } = usePOS();
  return (
    <CardHeader className="border-border border-b [.border-b]:pb-3.5">
      <div className="flex items-center justify-between">
        <CardTitle className="font-semibold text-card-foreground text-lg">
          Customer Information
        </CardTitle>
        <RadioGroup
          className="grid grid-cols-2 gap-2"
          onValueChange={handleCustomerTypeChange}
          value={customerType}
        >
          {customerTypeOptions.map((option) => (
            <Label className="cursor-pointer" htmlFor={option} key={option}>
              <RadioGroupItem
                className="peer sr-only"
                id={option}
                value={option}
              />
              <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-2 transition-all hover:border-primary hover:text-primary peer-aria-checked:border-primary peer-aria-checked:text-primary">
                <span className="capitalize">{option}</span>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </CardHeader>
  );
};
