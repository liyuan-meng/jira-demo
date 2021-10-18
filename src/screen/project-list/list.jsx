const List = ({ projects, userList }) => {
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
