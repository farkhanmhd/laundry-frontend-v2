import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";

export const useQuerySearchParam = (key: string) => {
  const [value, setValue] = useQueryState(key, {
    ...parseAsNativeArrayOf(parseAsString),
    history: 'replace',
    shallow: false
  });

  const setQuery = (newValue: string) => {
    setValue([newValue]);
  };

  const toggleQuery = (newValue: string) => {
    setValue((old) => {
      if (!old) {
        return [newValue];
      }
      if (old.includes(newValue)) {
        if(old.length === 1) {
          return null;
        }
        return old.filter((item) => item !== newValue);
      } else {
        return [...old, newValue];
      }
    });
  };

  const removeQuery = () => {
    setValue(null);
  };


  const selectedValues = new Set(value || []);

  return {  value, setQuery, toggleQuery, removeQuery, selectedValues };
};
