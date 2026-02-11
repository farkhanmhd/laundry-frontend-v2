import {
  parseAsIndex,
  parseAsInteger,
  useQueryState,
  useQueryStates,
} from "nuqs";

const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(50),
};

const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "rows",
};

export function useTablePaginationSearchParams() {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
  });
}

export function useSearchQueryParams() {
  return useQueryState("search", {
    defaultValue: '',
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      timeMs: 300,
      method: 'debounce'
    }
  });
}
