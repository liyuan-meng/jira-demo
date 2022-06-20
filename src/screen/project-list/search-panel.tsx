import { User } from "./list";
import { Input, Select } from 'antd';

interface SearchPanelProps {
    params: {
        name: string;
        personId: string;
    };
    setParams: (params: SearchPanelProps['params']) => void,
    userList: User[]
}

const SearchPanel = ({ params, setParams, userList }: SearchPanelProps) => {
  return (
    <div>
      <Input
        type="text"
        value={params.name}
        onChange={(evt) =>
          setParams({
            ...params,
            name: evt.target.value,
          })
        }
      />
      <Select
        value={params.personId}
        onChange={value =>
          setParams({
            ...params,
            personId: value,
          })
        }
      >
        <Select.Option value="">负责人</Select.Option>
        {userList.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchPanel;
