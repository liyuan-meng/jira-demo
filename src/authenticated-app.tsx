import ProjectListScreen from "./screen/project-list";
import {useAuth} from "./context/auth-context";
import { Button } from 'antd';

const AuthenticatedApp = () => {
    const { logout } = useAuth();

    return (
        <div>
            <ProjectListScreen/>
            <Button onClick={logout}>登出</Button>
        </div>
    )
};

export default AuthenticatedApp;
