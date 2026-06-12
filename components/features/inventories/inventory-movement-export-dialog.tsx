"use client";

import { format, startOfMonth } from "date-fns";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cardShadowStyle } from "@/lib/utils";

interface Props {
  id: string;
}

const formatDateParam = (date: Date) => format(date, "dd-MM-yyyy");

export function InventoryMovementExportDialog({ id }: Props) {
  const t = useTranslations("Inventories");
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  const [open, setOpen] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams();
  params.append("inventoryId", id);
  if (date?.from) {
    params.append("from", formatDateParam(date.from));
  }
  if (date?.to) {
    params.append("to", formatDateParam(date.to));
  }
  const href = `${baseUrl}/report/inventory/movement?${params.toString()}`;

  const dateLabel = date?.from ? (
    <>
      {format(date.from, "dd LLL y")}
      {date?.to && <> - {format(date.to, "dd LLL y")}</>}
    </>
  ) : (
    <span>Pick a date</span>
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Export</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("logs.movementTitle")}</DialogTitle>
          <DialogDescription>{t("logs.movementDescription")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t("logs.dateRange")}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start bg-card px-2.5 font-normal"
                  style={cardShadowStyle}
                  variant="outline"
                >
                  <span>{dateLabel}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  defaultMonth={date?.from}
                  mode="range"
                  numberOfMonths={2}
                  onSelect={(dateRange) => setDate(dateRange)}
                  selected={date}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            {t("form.cancel")}
          </Button>
          <Button asChild>
            <a
              download
              href={href}
              onClick={() => {
                toast.success("Export started");
                setOpen(false);
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Download />
              Export
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
