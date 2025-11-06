import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePaginationQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const updatePagination = (value: number) => {
    if (value === 1) {
      params.delete("page");
    } else {
      params.set("page", String(value));
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return { updatePagination };
};
