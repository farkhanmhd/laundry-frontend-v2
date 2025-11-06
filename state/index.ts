import type { Table } from "@tanstack/react-table";
import { atom, useAtom } from "jotai";

const tableAtom = <T>() => atom<Table<T> | undefined>(undefined)

export const useGlobalTable = <T>() => {
  const [table, setTable] = useAtom(tableAtom<T>())

  return { table, setTable}
}
