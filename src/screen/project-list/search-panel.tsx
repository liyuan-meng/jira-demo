import React from 'react';
import { User } from "./list";
import { Input, Select, Form } from 'antd';

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
    <Form style={{ marginBottom: '2rem' }} layout="inline">
        <Form.Item>
            <Input
                type="text"
                placeholder="项目名"
                value={params.name}
                onChange={(evt) =>
                    setParams({
                        ...params,
                        name: evt.target.value,
                    })
                }
            />
        </Form.Item>
        <Form.Item>
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
        </Form.Item>
    </Form>
  );
};

export default SearchPanel;
