"use client";

import { format, isValid, parse, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cardShadowStyle } from "@/lib/utils";

interface Props {
  dateRange?: DateRange | undefined;
}

const dateParser = {
  parse: (value: string) => {
    if (!value) {
      return null;
    }
    const d = parse(value, "dd-MM-yyyy", new Date());
    return isValid(d) ? d : null;
  },
  serialize: (value: Date) => format(value, "dd-MM-yyyy"),
};

export function DateRangePicker({ dateRange }: Props) {
  const defaultFrom = dateRange?.from ?? startOfMonth(new Date());
  const defaultTo = dateRange?.to ?? new Date();

  const [dateQuery, setDateQuery] = useQueryStates(
    {
      from: dateParser,
      to: dateParser,
    },
    {
      history: "replace",
      shallow: false,
    }
  );

  const date = {
    from: dateQuery.from ?? defaultFrom,
    to: dateQuery.to ?? defaultTo,
  };

  const dateLabel = date.from ? (
    <>
      {format(date.from, "dd LLL y")}
      {date.to && <> - {format(date.to, "dd LLL y")}</>}
    </>
  ) : (
    <span>Pick a date</span>
  );

  const handleDateChange = (dateRange: DateRange | undefined) => {
    setDateQuery({
      from: dateRange?.from,
      to: dateRange?.to,
    });
  };

  return (
    <Field>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="justify-start bg-card px-2.5 font-normal"
            id="date-picker-range"
            style={cardShadowStyle}
            variant="outline"
          >
            <CalendarIcon />
            {dateLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date.from}
            mode="range"
            numberOfMonths={2}
            onSelect={(dateRange) => handleDateChange(dateRange)}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
