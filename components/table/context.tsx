"use client";

import type { ColumnDef, Table } from "@tanstack/react-table";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";
import { useTable } from "./state"; // Your generic hook

// 1. Define the shape of the context
// We make it generic and use the precise types from your hook
interface TableContextType<T> {
  table: Table<T>;
  globalFilter: string;
  // This type is inferred from useSearchQueryParams
  setGlobalFilter: (
    value: string | ((old: string) => string | null) | null,
    options?: unknown // You can tighten this if you know the 'options' type
  ) => Promise<URLSearchParams>;
  // This type is from useState
  setInternalData: Dispatch<SetStateAction<T[]>>;
  columns: ColumnDef<T, unknown>[];
}

// 2. Create the context
// [THE FIX] Type the context itself as 'unknown'.
// This is the standard, safe alternative to 'any'.
const TableContext = createContext<unknown | undefined>(undefined);

// 3. Create the Provider component
interface TableProviderProps<T extends { id: string }> {
  children: ReactNode;
  columns: ColumnDef<T, unknown>[];
}

export function TableProvider<T extends { id: string }>({
  children,
  columns,
}: TableProviderProps<T>) {
  // This hook is generic and correctly infers 'T'
  const { table, globalFilter, setGlobalFilter, setInternalData } = useTable({
    columns,
  });

  // 'value' has the specific type: TableContextType<T>
  const value = {
    table,
    globalFilter,
    setGlobalFilter,
    columns,
    setInternalData,
  };

  // This works because any specific type (TableContextType<T>)
  // is assignable to 'unknown'.
  return (
    <TableContext.Provider value={value}>
      <div className="flex h-full flex-col">{children}</div>
    </TableContext.Provider>
  );
}

// 4. Create a generic custom hook to consume the context
export function useTableContext<T extends { id: string }>() {
  // [THE FIX] The context is 'unknown | undefined'
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  // [THE FIX] We perform an explicit cast from 'unknown' to our
  // specific generic type. This is the one, necessary trade-off.
  return context as TableContextType<T>;
}
