export type SearchQuery =
  | {
      page?: number;
      search?: string;
      rows?: number;
    }
  | undefined;

export type SearchQueryProps = {
  searchParams: Promise<SearchQuery>;
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
