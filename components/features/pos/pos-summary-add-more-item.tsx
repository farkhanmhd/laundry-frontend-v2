import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePOS } from "@/lib/modules/pos/state";

export function PosSummaryAddMoreItem() {
  const t = useTranslations("POS.summaryAddMoreItem");
  const { isPending } = usePOS();

  return (
    <div className="flex items-center justify-between border-t p-4">
      <div className="space-y-1">
        <p className="font-semibold text-sm">{t("needAnythingElse")}</p>
        <p className="text-muted-foreground text-xs">{t("addOtherItems")}</p>
      </div>
      <Button disabled={isPending} size="sm" variant="outline">
        <Link href="/pos">{t("addMore")}</Link>
      </Button>
    </div>
  );
}
