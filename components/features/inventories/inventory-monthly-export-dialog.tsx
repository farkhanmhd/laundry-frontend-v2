"use client";

import { format } from "date-fns";
import { enUS, id } from "date-fns/locale";
import { Download, TableOfContents } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

const monthValue = (month: number, year: number) =>
  `${String(month).padStart(2, "0")}-${year}`;

export function InventoryMonthlyExportDialog() {
  const t = useTranslations("Inventories");
  const tn = useTranslations("Notifications");
  const locale = useLocale();
  const dateLocale = locale === "id" ? id : enUS;

  const [open, setOpen] = useState(false);
  const [fromMonth, setFromMonth] = useState<number>(1);
  const [fromYear, setFromYear] = useState<number>(currentYear);

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2024, i, 1), "MMMM", { locale: dateLocale })
  );

  const handleDownload = () => {
    const month = monthValue(fromMonth, fromYear);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const href = `${baseUrl}/report/inventory/monthly?month=${month}`;

    window.open(href, "_blank");
    toast.success(tn("report.download.started"));
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TableOfContents className="h-3.5 w-3.5" />
          {t("monthlyReport.buttonLabel")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("monthlyReport.title")}</DialogTitle>
          <DialogDescription>
            {t("monthlyReport.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>{t("monthlyReport.month")}</Label>
            <div className="flex gap-2">
              <Select
                onValueChange={(v) => setFromMonth(Number(v))}
                value={String(fromMonth)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t("monthlyReport.monthLabel")} />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((name, i) => (
                    <SelectItem key={name} value={String(i + 1)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(v) => setFromYear(Number(v))}
                value={String(fromYear)}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={t("monthlyReport.yearLabel")} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            {t("form.cancel")}
          </Button>
          <Button onClick={handleDownload}>
            <Download />
            {t("monthlyReport.download")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
