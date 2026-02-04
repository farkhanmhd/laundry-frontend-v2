export const useQueryParams = (params: URLSearchParams) => {
  const setQuery = (key: string, value: string) => {
    params.set(key, value);
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
  }

  const getSelectedValues = (key: string) => params.getAll(key)

  const removeQuery = (key: string) => {
    params.delete(key);
  };

  return { setQuery, toggleQuery, removeQuery, getSelectedValues };
};
