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

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
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
        // catch 会消化异常，如果不主动抛出异常，外面是接收不到异常的（登录页面的 try catch ）；把 return error 改成 return Promise.reject(error)
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
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
