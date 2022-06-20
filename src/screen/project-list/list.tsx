import { Table } from 'antd';
import dayjs from "dayjs";

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
            rowKey="id"
            columns={
                [
                    {
                        title: '名称',
                        dataIndex: 'name',
                        sorter: (a, b) => a.name.localeCompare(b.name)
                    },
                    {
                        title: '部门',
                        dataIndex: 'organization',
                    },
                    {
                        title: '负责人',
                        dataIndex: 'personId',
                        render: (value, project) => {
                            return (
                                <span>
                                    {userList.find((u) => u.id === project.personId)?.name}
                                </span>
                            )
                        }
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'created',
                        render: (value, project) => {
                            return (
                                <span>
                                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                                </span>
                            )
                        }
                    },
                ]
            }
            dataSource={projects}
        />
    )
};

export default List;
