"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Client } from "@/components/utils/client";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";

export const PosCustomerPoints = () => {
  const { posData, togglePoint, handlePointChange } = usePOS();

  if (!posData.member) {
    return null;
  }

  return (
    <FieldLabel
      className="gap-0 bg-card"
      htmlFor="points"
      style={cardShadowStyle}
    >
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Redeem Loyalty Points</FieldTitle>
          <FieldDescription>
            {posData.member ? (
              <span>
                Balance:{" "}
                <span className="text-foreground">
                  {posData.member.points.toLocaleString("id-ID")}
                </span>
                . Enter amount to deduct from total.
              </span>
            ) : (
              "Select a member to enable point redemption."
            )}
          </FieldDescription>
        </FieldContent>
        <Switch
          checked={posData.points !== null}
          id="points"
          onCheckedChange={togglePoint}
        />
      </Field>
      {posData.points !== null && (
        <Client>
          <div className="fade-in slide-in-from-top-2 w-full animate-in px-4 pb-4 duration-300">
            <Input
              autoComplete="off"
              autoFocus
              inputMode="numeric"
              onChange={(e) => handlePointChange(e)}
              placeholder="Amount of points"
              value={posData.points}
            />
          </div>
        </Client>
      )}
    </FieldLabel>
  );
};
