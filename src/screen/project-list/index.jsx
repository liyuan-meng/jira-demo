import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { qs, cleanObject } from "../../utils/index";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [userList, setUserList] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUserList(await res.json());
      }
    });
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs(cleanObject(params))}`).then(async (res) => {
      if (res.ok) {
        setProjects(await res.json());
      }
    });
  }, [params]);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} userList={userList} />
      <List projects={projects} userList={userList} />
    </div>
  );
};

export default ProjectListScreen;
