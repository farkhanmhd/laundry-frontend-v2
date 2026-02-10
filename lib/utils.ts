import { type ClassValue, clsx } from "clsx";
import { parse, startOfMonth } from "date-fns";
import { Children, type ReactNode } from "react";
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MapItemsProps<T> {
  of: T[]; // Array of items to map
  render: (item: T, index: number) => ReactNode; // Render function
}

export const MapItems = <T>({ of, render }: MapItemsProps<T>): ReactNode[] =>
  Children.toArray(of.map((item, index) => render(item, index)));

export const formatToIDR = (value: number) =>
  new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export const getStatusColor = (
  status: string
): "default" | "secondary" | "outline" | "destructive" => {
  switch (status.toLowerCase()) {
    case "pending":
      return "destructive";
    case "processing":
    case "in progress":
      return "secondary";
    case "ready":
    case "assigned":
      return "secondary";
    case "completed":
      return "default";
    default:
      return "outline";
  }
};

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });

export const cardShadowStyle = {
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
};

export const intRegex = /^-?\d*$/;
export const positiveIntRegex = /[^0-9]/g;
export const phoneNumberRegex = /(?!^\+)[^0-9]/g;

export type SelectOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type DateRangeSearchParams = {
  from: string;
  to: string;
};

export const getDateRange = (searchParams: DateRangeSearchParams) => {
  const DATE_FORMAT = "dd-MM-yyyy";
  let dateRange: DateRange | undefined;

  if (searchParams.from && searchParams.to) {
    try {
      dateRange = {
        // parse(dateString, formatString, referenceDate)
        from: parse(searchParams.from, DATE_FORMAT, new Date()),
        to: parse(searchParams.to, DATE_FORMAT, new Date()),
      };
    } catch (error) {
      console.error("Invalid date format in URL", error);
      // Fallback to undefined so the picker uses default
      dateRange = {
        from: startOfMonth(new Date()),
        to: new Date(),
      };
    }
  } else {
    dateRange = {
      from: startOfMonth(new Date()),
      to: new Date(),
    };
  }

  return dateRange;
};

export const salesTabLists: SelectOption[] = [
  {
    label: "Overview",
    value: "overview",
  },
  {
    label: "Orders",
    value: "orders",
  },
  {
    label: "Item Logs",
    value: "items",
  },
];
