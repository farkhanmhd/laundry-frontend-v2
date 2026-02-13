"use client";

import { Banknote, QrCode, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Client } from "@/components/utils/client";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

const bankNotes = [1000, 2000, 5000, 10_000, 20_000, 50_000, 100_000];

export function PosPaymentMethod() {
  const t = useTranslations("POS.paymentMethod");
  const {
    posData,
    handlePaymentMethodChange,
    amountPaidValidation,
    handleAmountPaidChange,
  } = usePOS();

  const handleNoteClick = (amount: number) => {
    handleAmountPaidChange(posData.amountPaid + amount);
  };

  return (
    <Card style={cardShadowStyle}>
      <CardContent>
        <RadioGroup
          className="grid grid-cols-2 gap-4"
          onValueChange={handlePaymentMethodChange}
          value={posData.paymentMethod}
        >
          <Label className="cursor-pointer" htmlFor="cash">
            <RadioGroupItem className="peer sr-only" id="cash" value="cash" />
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border-2 p-2 transition-all hover:border-primary hover:text-primary peer-aria-checked:border-primary peer-aria-checked:text-primary">
              <Banknote className="h-6 w-6" />
              <span className="font-medium">{t("cash")}</span>
            </div>
          </Label>

          <Label className="cursor-pointer" htmlFor="qris">
            <RadioGroupItem className="peer sr-only" id="qris" value="qris" />
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border-2 p-2 transition-all hover:border-primary hover:text-primary peer-aria-checked:border-primary peer-aria-checked:text-primary">
              <QrCode className="h-6 w-6" />
              <span className="font-medium">{t("qris")}</span>
            </div>
          </Label>
        </RadioGroup>
      </CardContent>
      {posData.paymentMethod === "cash" && (
        <CardFooter className="flex-col gap-4">
          <div className="flex w-full flex-col gap-3">
            <Label className="font-semibold text-sm" htmlFor="cash-amount">
              {t("cashAmountReceived")}
            </Label>
            <div className="relative">
              <span className="absolute top-2 left-3 text-muted-foreground text-sm">
                Rp
              </span>
              <Input
                aria-invalid={amountPaidValidation}
                autoComplete="off"
                className="mb-1 pl-10"
                id="cash-amount"
                onChange={(e) => handleAmountPaidChange(e.target.value)}
                placeholder="0"
                value={posData.amountPaid}
              />
              {amountPaidValidation && (
                <span className="text-destructive text-sm">
                  {t("amountPaidMustBeEqual")}
                </span>
              )}
            </div>
          </div>
          <ul className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 [&>li>button]:w-full [&>li]:w-full">
            {bankNotes.map((note) => (
              <li key={note}>
                <Button
                  className="border-primary text-primary"
                  onClick={() => handleNoteClick(note)}
                  variant="outline"
                >
                  <Client>{formatToIDR(note)}</Client>
                </Button>
              </li>
            ))}
            <li>
              <Button
                className="border border-destructive bg-background text-destructive hover:bg-destructive/25 dark:bg-transparent dark:hover:bg-destructive/25"
                onClick={() => handleAmountPaidChange(String(0))}
                variant="destructive"
              >
                <Trash />
                <span>{t("clear")}</span>
              </Button>
            </li>
          </ul>
        </CardFooter>
      )}
    </Card>
  );
}
