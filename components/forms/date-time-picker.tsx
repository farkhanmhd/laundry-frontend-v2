"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  dateLabel?: string;
  timeLabel?: string;
};

export function DateTimePicker({ date, onChange, dateLabel = "", timeLabel = "" }: Props) {
  const [open, setOpen] = React.useState(false);
  const futureDateLimit = new Date();
  futureDateLimit.setFullYear(futureDateLimit.getFullYear() + 100);

  /**
   * Memoize the time value to prevent unnecessary re-renders.
   * This formats the date object into a `HH:mm:ss` string for the time input.
   */
  const timeValue = React.useMemo(() => {
    if (!date) {
      return "";
    }
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [date]);

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
   * Handles the change event from the time input.
   * It preserves the existing date when the time changes.
   */
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value;
    if (!timeString) {
      return;
    }

    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Use today's date as a base if no date is selected, otherwise use the existing date.
    const baseDate = date ? new Date(date) : new Date();

    // Create a new Date object with the existing date and the new time.
    baseDate.setHours(hours, minutes, seconds || 0);

    onChange(baseDate);
  };

  return (
    <div className='flex gap-4'>
      <div className='flex flex-1 flex-col gap-3'>
        {dateLabel && (
          <Label className='px-1' htmlFor='date-picker'>
            {dateLabel}
          </Label>
        )}
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild>
            <Button className='justify-between font-normal' id='date-picker' variant='outline'>
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent align='start' className='w-auto overflow-hidden p-0'>
            <Calendar captionLayout='dropdown' disabled={{ before: new Date() }} endMonth={futureDateLimit} mode='single' onSelect={handleDateSelect} selected={date} startMonth={new Date()} />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-1 flex-col gap-3'>
        {timeLabel && (
          <Label className='px-1' htmlFor='time-picker'>
            {timeLabel}
          </Label>
        )}
        <Input
          className='appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
          id='time-picker'
          onChange={handleTimeChange}
          step='1'
          type='time'
          value={timeValue}
        />
      </div>
    </div>
  );
}
