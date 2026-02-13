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
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";

export const PosCustomerPoints = () => {
  const t = useTranslations("POS.customerPoints");
  const { posData, togglePoint, handlePointChange } = usePOS();

  if (!posData.member) {
    return null;
  }

  return (
    <FieldLabel
      className="gap-0 bg-background has-data-[state=checked]:border-primary has-data-[state=checked]:bg-background"
      htmlFor="points"
      style={cardShadowStyle}
    >
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{t("redeemLoyaltyPoints")}</FieldTitle>
          <FieldDescription>
            {posData.member ? (
              <span>
                {t("balance")}{" "}
                <span className="text-foreground">
                  {posData.member.points.toLocaleString("id-ID")}
                </span>
                {t("enterAmountDescription")}
              </span>
            ) : (
              t("selectMemberToEnable")
            )}
          </FieldDescription>
        </FieldContent>
        <Switch
          checked={posData.points !== null}
          id="points"
          onCheckedChange={togglePoint}
        />
      </Field>

      <AnimatePresence initial={false}>
        {posData.points !== null && (
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
                  placeholder={t("amountOfPoints")}
                  value={posData.points}
                />
              </Client>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FieldLabel>
  );
};
