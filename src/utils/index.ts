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

export const useDebounce = <V>(value: V, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

// [T[], () => void, (index: number) => void, (data: T) => void]
// 返回数组的时候需要加此处的声明（ts中数组中各项的类型应该是一样的）
// 返回对象则不需要（会进行类型推断）
export function useArray<T>(
  arr: T[]
): [T[], () => void, (index: number) => void, (data: T) => void] {
  const [values, setValues] = useState(arr);

  const add = (data: T) => {
    setValues([data, ...values]);
  };

  const removeIndex = (index: number) => {
    const valuesCopy = [...values];
    valuesCopy.splice(index, 1);
    setValues(valuesCopy);
  };

  const clear = () => {
    setValues([]);
  };

  return [values, clear, removeIndex, add];
}
