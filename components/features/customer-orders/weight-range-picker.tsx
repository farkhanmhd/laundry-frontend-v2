"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { WeightRange } from "@/lib/modules/weight-ranges/data";
import { cardShadowStyle } from "@/lib/utils";

type Props = {
  weightRanges: WeightRange[];
  selectedWeightRange: WeightRange | null;
  onWeightRangeChange: (range: WeightRange | null) => void;
  weight: number | null | undefined;
  onWeightChange: (weight: number | null | undefined) => void;
};

export function WeightRangePicker({
  weightRanges,
  selectedWeightRange,
  onWeightRangeChange,
  weight,
  onWeightChange,
}: Props) {
  const id = useId();
  const t = useTranslations("CustomerOrders.orderSummary");

  const isWeightOutOfRange =
    weight != null &&
    selectedWeightRange != null &&
    (weight < Number(selectedWeightRange.minWeight) ||
      weight > Number(selectedWeightRange.maxWeight));

  return (
    <Card className="space-y-4" style={cardShadowStyle}>
      <CardContent>
        <Field>
          <FieldLabel>{t("weightRange")}</FieldLabel>
          <FieldContent>
            <RadioGroup
              className="grid grid-cols-3 gap-3"
              onValueChange={(value) => {
                const range =
                  weightRanges.find((r) => r.id.toString() === value) ?? null;
                onWeightRangeChange(range);
              }}
              value={selectedWeightRange?.id.toString() ?? ""}
            >
              {weightRanges.map((range) => (
                <FieldLabel htmlFor={`${id}-${range.id}`} key={range.id}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{range.label}</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem
                      id={`${id}-${range.id}`}
                      value={range.id.toString()}
                    />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </FieldContent>
        </Field>
      </CardContent>
      {selectedWeightRange && (
        <CardFooter>
          <Field orientation="vertical">
            <FieldLabel htmlFor={`${id}-weight`}>
              {t("customWeight")}
            </FieldLabel>
            <FieldContent>
              <Input
                id={`${id}-weight`}
                max={Number(selectedWeightRange.maxWeight)}
                min={Number(selectedWeightRange.minWeight)}
                onChange={(e) => {
                  const val = e.target.value;
                  onWeightChange(val ? Number(val) : null);
                }}
                placeholder={`${selectedWeightRange.minWeight} - ${selectedWeightRange.maxWeight} kg`}
                step="0.1"
                type="number"
                value={weight ?? ""}
              />
              {isWeightOutOfRange && (
                <FieldDescription className="text-destructive">
                  {t("weightOutOfRange", {
                    minWeight: selectedWeightRange.minWeight,
                    maxWeight: selectedWeightRange.maxWeight,
                  })}
                </FieldDescription>
              )}
            </FieldContent>
          </Field>
        </CardFooter>
      )}
    </Card>
  );
}
