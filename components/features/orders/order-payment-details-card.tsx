"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/components/utils/client";
import type { OrderPaymentDetails } from "@/lib/modules/orders/data";
import { cardShadowStyle, cn, formatDate, formatToIDR } from "@/lib/utils";
import { usePaymentDetail } from "./use-payment-detail";

interface OrderPaymentDetailsCardProps {
  initialData: OrderPaymentDetails;
}

const successVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const successItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const pendingItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const OrderPaymentDetailsCard = ({
  initialData,
}: OrderPaymentDetailsCardProps) => {
  const t = useTranslations("Orders.payment");
  const { isExpired, isQris, isPending, paymentDetails, timeLeft, isPaid } =
    usePaymentDetail(initialData);

  if (isPaid) {
    return (
      <motion.div
        animate="visible"
        className="w-full max-w-md rounded-xl border bg-background p-6"
        initial="hidden"
        style={cardShadowStyle}
        variants={successVariants}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div variants={successItemVariants}>
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </motion.div>
          <motion.div className="space-y-1" variants={successItemVariants}>
            <h3 className="font-bold text-2xl text-green-600">
              {t("paymentSuccess")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("paymentVerified")}
            </p>
          </motion.div>
        </div>

        <Separator className="my-6" />

        <motion.div
          className="space-y-3 text-sm"
          variants={successItemVariants}
        >
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("paymentMethod")}</span>
            <span className="font-semibold uppercase">
              {paymentDetails.paymentType || "-"}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("status")}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700 text-xs uppercase dark:bg-green-900 dark:text-green-300">
              {paymentDetails.transactionStatus}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("total")}</span>
            <span className="font-semibold">
              {formatToIDR(paymentDetails.total)}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("amountPaid")}</span>
            <span className="font-semibold text-green-600">
              {formatToIDR(paymentDetails.amountPaid)}
            </span>
          </div>

          {paymentDetails.change !== null && paymentDetails.change > 0 && (
            <>
              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("change")}</span>
                <span className="font-semibold">
                  {formatToIDR(paymentDetails.change)}
                </span>
              </div>
            </>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("paidAt")}</span>
            <Client>
              <span className="font-semibold">
                {formatDate(paymentDetails.updatedAt)}
              </span>
            </Client>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <Card className="w-full max-w-md" style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
          <QrCode className="h-5 w-5" />
          <Link
            className="transition-colors hover:text-foreground"
            href={`/orders/${paymentDetails.orderId}`}
          >
            {t("paymentInformation")}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {isExpired ? (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-destructive text-xl">
                {t("paymentFailed")}
              </h3>
              <p className="text-muted-foreground">{t("orderCancelled")}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            animate="visible"
            className="flex flex-col gap-6"
            initial="hidden"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {isQris && isPending && paymentDetails.actions?.[0]?.url && (
              <motion.div variants={pendingItemVariants}>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-center text-muted-foreground">
                    {t("scanQris")}
                  </span>
                  <div className="relative aspect-square w-56 overflow-hidden rounded-lg border-2 border-dashed p-2">
                    <Image
                      alt="QRIS Payment"
                      className="object-contain"
                      fill
                      src={paymentDetails.actions[0].url}
                      unoptimized
                    />
                  </div>
                </div>
                <Separator className="mt-6" />
              </motion.div>
            )}

            {isPending && paymentDetails.expiryTime && (
              <motion.div variants={pendingItemVariants}>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-muted-foreground">
                    {t("timeRemaining")}
                  </span>
                  <span className={cn("font-bold text-2xl tracking-wider")}>
                    {timeLeft}
                  </span>
                </div>
                <Separator className="mt-6" />
              </motion.div>
            )}

            <motion.div
              className="grid gap-3 text-sm"
              variants={pendingItemVariants}
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("amountToPay")}
                </span>
                <motion.span
                  animate={{ scale: [1, 1.02, 1] }}
                  className="font-bold text-lg"
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {formatToIDR(paymentDetails.total)}
                </motion.span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("paymentMethod")}
                </span>
                <span className="font-semibold uppercase">
                  {paymentDetails.paymentType || "-"}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("status")}</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700 text-xs uppercase dark:bg-amber-900 dark:text-amber-300">
                  {paymentDetails.transactionStatus}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {isPaid ? t("paidAt") : t("transactionTime")}
                </span>
                <Client>
                  <span className="font-semibold">
                    {isPaid
                      ? formatDate(paymentDetails.updatedAt)
                      : (formatDate(paymentDetails.transactionTime) ?? "-")}
                  </span>
                </Client>
              </div>
            </motion.div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
