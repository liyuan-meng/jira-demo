import { useEffect, useRef, useState } from "react";
import { doc } from "prettier";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// let b:{ [key: string]: unknown };
// b = { name: 'jack' }; // 不报错
// b = () => {}; // 报错
export const cleanObject = (obj: { [key: string]: unknown }) => {
  return Object.keys(obj).reduce((result: { [key: string]: unknown }, key) => {
    if (!isVoid(obj[key])) {
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
    // TODO 依赖项里加入 callback 会造成无限循环，这个和 useCallback 以及 useMemo 有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
};

// [T[], () => void, (index: number) => void, (data: T) => void]
// 返回数组的时候需要加此处的声明（ts中数组中各项的类型应该是一样的）
// 返回对象则不需要（会进行类型推断）
// ps: 可以在 function useArray<T> 这里给泛型一个默认值 function useArray<T = {user: string; name: string}>；
// ps: 在使用 useArray 的时候也可以给泛型赋值：useArray<{ user: string } | undefined>([{ user: '3434' }, undefined])
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // const refContainer = useRef(initialValue);
  // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  // 组件卸载时，使用旧的 title
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
