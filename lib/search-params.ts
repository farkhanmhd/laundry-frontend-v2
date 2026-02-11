import type { InventoryHistoryQuery } from "./modules/inventories/data";
import type { InventoryReportsQuery } from "./modules/inventory-reports/data";

export type SearchQuery = {
  page?: number | undefined;
  search?: string | undefined;
  rows?: number | undefined;
};

export type SearchQueryProps = {
  searchParams: Promise<SearchQuery | undefined>;
};

export type InventoryHistoryQueryProps = {
  searchParams: Promise<InventoryHistoryQuery | undefined>;
};

export type InventoryReportsQueryProps = {
  searchParams: Promise<InventoryReportsQuery | undefined>;
};

export const getInventoryReportsQuery = async (
  props: InventoryReportsQueryProps
) => {
  const searchParams = await props.searchParams;
  const query: Required<InventoryReportsQuery> = {
    from: searchParams?.from || "",
    to: searchParams?.to || "",
  };

  return query;
};

export const getSearchQuery = async (props: SearchQueryProps) => {
  const searchParams = await props.searchParams;
  const query: Required<SearchQuery> = {
    rows: Number(searchParams?.rows) || 50,
    search: searchParams?.search || "",
    page: Number(searchParams?.page) || 1,
  };

  return query;
};

export const getInventoryHistoryQuery = async (
  props: InventoryHistoryQueryProps
) => {
  const searchParams = await props.searchParams;
  const query: Required<InventoryHistoryQuery> = {
    rows: Number(searchParams?.rows) || 50,
    search: searchParams?.search || "",
    page: Number(searchParams?.page) || 1,
    category: searchParams?.category || [],
    inventoryIds: searchParams?.inventoryIds || [],
  };

  return query;
};
