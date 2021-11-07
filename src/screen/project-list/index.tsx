import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";

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
  }, [debouncedParams]);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} userList={userList} />
      <List projects={projects} userList={userList} />
    </div>
  );
};

export default ProjectListScreen;
