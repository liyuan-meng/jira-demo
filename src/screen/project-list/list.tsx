import { Table } from 'antd';
import dayjs from "dayjs";
import {TableProps} from "antd/es";

export interface Project {
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

// ListProps 由两部分组成，一个是 userList，另一部分是 Table 组件的 props
// TableProps<Project> 是一个范性接口 https://www.tslang.cn/docs/handbook/generics.html
// 这里使用 extends 继承，是为了外层给 List 组件传入的参数，可以直接透传给 Table
interface ListProps extends TableProps<Project> {
    userList: User[]
}

// 这里 props 的类型就是 Omit<ListProps, userList>
const List = ({ userList, ...props }: ListProps) => {
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
            {...props}
        />
    )
};

export default List;
