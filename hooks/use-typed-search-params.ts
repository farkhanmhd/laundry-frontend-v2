import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type ParamParser<T> = (value: string | null) => T;

// Built-in parsers you can reuse
export const parsers = {
  string: (v: string | null): string | undefined => v ?? undefined,
  number: (v: string | null): number | undefined => {
    if (v === null) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  },
  boolean: (v: string | null): boolean => v === 'true',
  enum: <T extends string>(allowed: readonly T[]) =>
    (v: string | null): T | undefined =>
      allowed.includes(v as T) ? (v as T) : undefined,
};

type Schema<T> = {
  [K in keyof T]: ParamParser<T[K]>;
};

export function useTypedSearchParams<T extends Record<string, unknown>>(
  schema: Schema<T>
): T {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const result = {} as T;
    for (const key in schema) {
      const raw = searchParams.get(key);
      result[key] = schema[key](raw) as T[typeof key];
    }
    return result;
  }, [searchParams, schema]);
}
