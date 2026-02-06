import type { LocationQueryValue } from 'vue-router';
export const getQueryString = (
  value: LocationQueryValue | LocationQueryValue[] | undefined
): string | undefined => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value.find((entry): entry is string => typeof entry === 'string');
  }
  return undefined;
};
