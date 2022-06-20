import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [userList, setUserList] = useState([]);
  const [projects, setProjects] = useState([]);
  const debouncedParams = useDebounce(params, 200);
  const client = useHttp();

  useMount(() => {
    client('users').then(setUserList)
  });

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParams) }).then(setProjects)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} userList={userList} />
      <List projects={projects} userList={userList} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`
