import { atom, useAtom } from "jotai";
import type { salesTabLists } from "@/lib/utils";

type SalesTab = (typeof salesTabLists)[number]["value"];

const salesTabAtom = atom<SalesTab>("overview");

export const useSalesTab = () => {
  const [tab, setTab] = useAtom(salesTabAtom);

  return { tab, setTab };
};
