import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from 'antd';

const RegisterScreen = () => {
    const { register } = useAuth();

    const handleSubmit = (values: { username: string, password: string }) => {
        register(values);
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username"/>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输密码' }]}>
                <Input placeholder="密码" type="password" id="password"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">注册</Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterScreen;
