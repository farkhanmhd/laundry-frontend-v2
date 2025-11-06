export const useQueryParams = (params: URLSearchParams) => {
  const setQuery = (key: string, value: string) => {
    params.set(key, value);
  };

  const removeQuery = (key: string) => {
    params.delete(key);
  };

  return { setQuery, removeQuery };
};
