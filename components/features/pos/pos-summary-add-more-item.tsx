import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";

export function PosSummaryAddMoreItem() {
  const t = useTranslations("POS.summaryAddMoreItem");

  return (
    <div className="flex items-center justify-between border-t p-4">
      <div className="space-y-1">
        <p className="font-semibold text-sm">{t("needAnythingElse")}</p>
        <p className="text-muted-foreground text-xs">{t("addOtherItems")}</p>
      </div>
      <Link
        className={buttonVariants({ variant: "outline", size: "sm" })}
        href="/pos"
      >
        {t("addMore")}
      </Link>
    </div>
  );
}
