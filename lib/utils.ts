import { type ClassValue, clsx } from "clsx";
import { Children, type ReactNode } from "react";
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
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
