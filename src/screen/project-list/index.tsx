import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List, {Project} from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useAsync} from "../../utils/use-async";

const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [userList, setUserList] = useState([]);
  const debouncedParams = useDebounce(params, 200);
  const client = useHttp();
  // 如果不指定 <Project[]>，则会报错（unknown 应该是推断出的类型，无法赋值给 dataSource，dataSource 是 Project[] | undefined 类型）
  // TS2322: Type 'unknown' is not assignable to type 'readonly Project[] | undefined'.
  //   Type 'unknown' is not assignable to type 'readonly Project[]'.
  const { run, data: projects, error, isLoading } = useAsync<Project[]>();

  useMount(() => {
    client('users').then(setUserList)
  });

  useEffect(() => {
    run(client('projects', { data: cleanObject(debouncedParams) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} userList={userList} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List dataSource={projects || []} userList={userList} loading={isLoading} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`
