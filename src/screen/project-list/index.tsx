import { useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProject} from "../../utils/project";
import {useUsers} from "../../utils/user";

const ProjectListScreen = () => {
    useDocumentTitle('项目列表', false);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debouncedParams = useDebounce(params, 200);
  const { data: projects, error, isLoading } = useProject(debouncedParams);
  const { data: userList } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} userList={userList || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List dataSource={projects || []} userList={userList || []} loading={isLoading} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`
