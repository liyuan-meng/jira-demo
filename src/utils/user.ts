import { cleanObject } from "./index";
import { User } from "../screen/project-list/list";
import { useHttp } from "./http";
import { useEffect } from "react";
import { useAsync } from "./use-async";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
