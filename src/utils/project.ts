import { useAsync } from "./use-async";
import { Project } from "../screen/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();

  // 如果不指定 <Project[]>，则会报错（unknown 应该是推断出的类型，无法赋值给 dataSource，dataSource 是 Project[] | undefined 类型）
  // TS2322: Type 'unknown' is not assignable to type 'readonly Project[] | undefined'.
  //   Type 'unknown' is not assignable to type 'readonly Project[]'.
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
