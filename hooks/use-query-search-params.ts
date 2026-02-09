import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useQuerySearchParams = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const setQuery = (key: string, value: string) => {
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleQuery = (key: string, value: string) => {
    if (params.has(key, value)) {
      const newValues = params.getAll(key).filter((v) => v !== value)
      params.delete(key)
      for (const v of newValues) {
        params.append(key, v)
      }
    } else {
      params.append(key, value)
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const getSelectedValues = (key: string) => params.getAll(key)

  const removeQuery = (key: string) => {
    params.delete(key);
    replace(`${pathname}?${params.toString()}`);
  };

  return { setQuery, toggleQuery, removeQuery, getSelectedValues };
};
