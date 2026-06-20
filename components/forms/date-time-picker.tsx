"use client";

import { ChevronDownIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  dateLabel?: string;
  timeLabel?: string;
  disablePast?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export function DateTimePicker({
  date,
  onChange,
  dateLabel = "",
  timeLabel = "",
  disablePast = false,
  disabled = false,
  id = "date-picker",
  className,
  style,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const futureDateLimit = new Date();
  futureDateLimit.setFullYear(futureDateLimit.getFullYear() + 100);

  const hourValue = date ? String(date.getHours()) : undefined;
  const minuteValue = date ? String(date.getMinutes()) : undefined;

  /**
   * Handles the selection of a new date from the calendar.
   * It preserves the existing time when the date changes.
   */
  const handleDateSelect = (selectedDay: Date | undefined) => {
    if (!selectedDay) {
      onChange(undefined);
      setOpen(false);
      return;
    }

    // Preserve the time from the existing date object, if any.
    const currentHours = date ? date.getHours() : 0;
    const currentMinutes = date ? date.getMinutes() : 0;
    const currentSeconds = date ? date.getSeconds() : 0;

    // Create a new Date object with the selected day and the preserved time.
    const newDate = new Date(selectedDay);
    newDate.setHours(currentHours, currentMinutes, currentSeconds);

    onChange(newDate);
    setOpen(false);
  };

  /**
   * Handles a change to the hour dropdown.
   * Preserves the existing date and minute while updating the hour.
   */
  const handleHourChange = (value: string) => {
    const baseDate = date ? new Date(date) : new Date();
    baseDate.setHours(Number(value), baseDate.getMinutes(), 0);
    onChange(baseDate);
  };

  /**
   * Handles a change to the minute dropdown.
   * Preserves the existing date and hour while updating the minute.
   */
  const handleMinuteChange = (value: string) => {
    const baseDate = date ? new Date(date) : new Date();
    baseDate.setMinutes(Number(value), 0);
    onChange(baseDate);
  };

  return (
    <div className="flex flex-col gap-3">
      {dateLabel && (
        <Label className="px-1" htmlFor="date-picker">
          {dateLabel}
        </Label>
      )}
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "justify-between border-input font-normal",
              className
            )}
            disabled={disabled}
            id={id}
            style={style}
            variant="outline"
          >
            {date
              ? `${date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} ${String(date.getHours()).padStart(2, "0")}:${String(
                  date.getMinutes()
                ).padStart(2, "0")}`
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar
            captionLayout="dropdown"
            disabled={disablePast ? { before: new Date() } : undefined}
            endMonth={futureDateLimit}
            mode="single"
            onSelect={handleDateSelect}
            selected={date}
            startMonth={new Date()}
          />

          <div className="flex items-center gap-2 border-b p-3">
            {timeLabel && (
              <Label className="px-1 text-xs" htmlFor="hour-picker">
                {timeLabel}
              </Label>
            )}
            <Select
              disabled={disabled}
              onValueChange={handleHourChange}
              value={hourValue}
            >
              <SelectTrigger
                className="flex-1 dark:bg-background"
                id="hour-picker"
              >
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent>
                {HOURS.map((hour) => (
                  <SelectItem key={hour} value={String(hour)}>
                    {String(hour).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">:</span>
            <Select
              disabled={disabled}
              onValueChange={handleMinuteChange}
              value={minuteValue}
            >
              <SelectTrigger
                className="flex-1 dark:bg-background"
                id="minute-picker"
              >
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {MINUTES.map((minute) => (
                  <SelectItem key={minute} value={String(minute)}>
                    {String(minute).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
