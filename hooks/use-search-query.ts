import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useQueryParams } from "./use-query-params";

export const useSearchQuery = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { setQuery, removeQuery } = useQueryParams(params);
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    if (value) {
      setQuery("search", value);
    } else {
      removeQuery("search");
    }

    removeQuery("page");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return { updateSearchQuery };
};
