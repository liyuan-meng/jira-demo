interface Project {
    id: string;
    name: string;
    personId: string;
    organization: string;
    created: string;
}

export interface User {
    id: string;
    name: string;
    token: string;
}

interface ListProps {
    projects: Project[];
    userList: User[]
}

const List = ({ projects, userList }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{userList.find((u) => u.id === p.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
