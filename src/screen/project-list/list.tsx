import { Table } from 'antd';

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
        <Table
            pagination={false}
            columns={
                [
                    {
                        title: '名称',
                        dataIndex: 'name',
                        sorter: (a, b) => a.name.localeCompare(b.name)
                    },
                    {
                        title: '负责人',
                        render: (value, project) => {
                            return (
                                <span>
                                    {userList.find((u) => u.id === project.personId)?.name}
                                </span>
                            )
                        }
                    }
                ]
            }
            dataSource={projects}
        />
    )
};

export default List;
