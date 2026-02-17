"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
import { cardShadowStyle } from "@/lib/utils";
import { useCustomerOrder } from "./state";

export const CustomerOrderPoints = () => {
  const t = useTranslations("CustomerOrders");
  const { customerCart, userPoints, togglePoint, handlePointChange } =
    useCustomerOrder();

  return (
    <FieldLabel
      className="gap-0 bg-background has-data-[state=checked]:border-primary has-data-[state=checked]:bg-background"
      htmlFor="points"
      style={cardShadowStyle}
    >
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{t("customerPoints.redeemLoyaltyPoints")}</FieldTitle>
          <FieldDescription>
            <span>
              {t("customerPoints.balance")}{" "}
              <span className="text-foreground">
                {userPoints?.toLocaleString("id-ID")}
              </span>{" "}
              {t("customerPoints.enterAmountDescription")}
            </span>
          </FieldDescription>
        </FieldContent>
        <Switch
          checked={customerCart.points !== null}
          id="points"
          onCheckedChange={togglePoint}
        />
      </Field>

      <AnimatePresence initial={false}>
        {customerCart.points !== null && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="w-full overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            key="points-input-wrapper"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="w-full px-4 pb-4">
              <Client>
                <Input
                  autoComplete="off"
                  autoFocus
                  className="w-full"
                  id="points-input"
                  inputMode="numeric"
                  onChange={(e) => handlePointChange(e)}
                  placeholder={t("customerPoints.amountOfPoints")}
                  value={customerCart.points}
                />
              </Client>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FieldLabel>
  );
};
