import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

export const useAsync = <D>(initialState?: State<D>) => {
  // 数据初始化
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  // 请求成功
  const setData = (data: D) => {
    setState({
      stat: "success",
      error: null,
      data,
    });
  };

  // 请求失败
  const setError = (error: Error) => {
    setState({
      stat: "error",
      error,
      data: null,
    });
  };

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
