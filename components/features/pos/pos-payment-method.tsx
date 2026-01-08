"use client";

import { Banknote, QrCode, Receipt, Trash } from "lucide-react"; // Assuming lucide-react is available
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Client } from "@/components/utils/client";
import { usePosOrderItem } from "@/lib/modules/pos/state";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

const bankNotes = [1000, 2000, 5000, 10_000, 20_000, 50_000, 100_000];

export function PosPaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState<number>(0);
  const { totalAmount } = usePosOrderItem();

  const changeAmount = useMemo(
    () => Math.max(0, cashReceived - totalAmount),
    [cashReceived, totalAmount]
  );

  const handleNoteClick = (amount: number) => {
    setCashReceived(cashReceived + amount);
  };

  return (
    <div className="space-y-4">
      {/* Payment Method Selection */}
      <Card style={cardShadowStyle}>
        <CardHeader className="border-b">
          <CardTitle>Select Payment Method</CardTitle>
          <CardDescription>
            Select preferred payment method for customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            className="grid grid-cols-2 gap-4"
            onValueChange={setPaymentMethod}
            value={paymentMethod}
          >
            <Label className="cursor-pointer" htmlFor="cash">
              <RadioGroupItem className="peer sr-only" id="cash" value="cash" />
              <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all hover:border-primary/50 hover:bg-primary/5 peer-aria-checked:border-primary peer-aria-checked:bg-primary/5">
                <Banknote className="h-6 w-6" />
                <span className="font-medium">Cash</span>
              </div>
            </Label>

            <Label className="cursor-pointer" htmlFor="qris">
              <RadioGroupItem className="peer sr-only" id="qris" value="qris" />
              <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all hover:border-primary/50 hover:bg-primary/5 peer-aria-checked:border-primary peer-aria-checked:bg-primary/5">
                <QrCode className="h-6 w-6" />
                <span className="font-medium">QRIS</span>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
        {paymentMethod === "cash" && (
          <CardFooter className="flex-col gap-4">
            <div className="flex w-full flex-col gap-3">
              <Label className="font-semibold text-sm" htmlFor="cash-amount">
                Cash Amount Received
              </Label>
              <div className="relative">
                <span className="absolute top-2 left-3 text-muted-foreground text-sm">
                  Rp
                </span>
                <Input
                  className="pl-10"
                  id="cash-amount"
                  onChange={(e) => setCashReceived(Number(e.target.value))}
                  placeholder="0"
                  value={cashReceived}
                />
              </div>
            </div>
            <ul className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 [&>li>button]:w-full [&>li]:w-full">
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
                  onClick={() => setCashReceived(0)}
                  variant="destructive"
                >
                  <Trash />
                  <span>Clear</span>
                </Button>
              </li>
            </ul>
          </CardFooter>
        )}
      </Card>

      {/* Intuitive Payment Summary */}
      <Card className="overflow-hidden" style={cardShadowStyle}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Payment Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-muted-foreground text-sm">
            <span>Payment Method</span>
            <span className="font-medium text-foreground uppercase">
              {paymentMethod}
            </span>
          </div>

          <div className="flex justify-between border-t pt-3">
            <span className="font-semibold text-base">Total Amount</span>
            <Client>
              <span className="font-bold text-primary text-xl">
                {formatToIDR(totalAmount)}
              </span>
            </Client>
          </div>

          {paymentMethod === "cash" && (
            <>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Cash Received</span>
                <Client>
                  <span>{formatToIDR(cashReceived)}</span>
                </Client>
              </div>
              <div className="flex justify-between border-t border-dashed pt-3">
                <span className="font-semibold">Change to Return</span>
                <Client>
                  <span className="font-bold text-lg">
                    {formatToIDR(changeAmount)}
                  </span>
                </Client>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
