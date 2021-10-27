import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
  return Object.keys(obj).reduce((result, key) => {
    // @ts-ignore
    if (!isFalsy(obj[key])) {
      // @ts-ignore
      result[key] = obj[key];
    }
    return result;
  }, {});
};

export const qs = (obj: any) => {
  return Object.keys(obj)
    .reduce((arr: string[], key: string) => {
      arr.push(`${key}=${obj[key]}`);
      return arr;
    }, [])
    .join("&");
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};
