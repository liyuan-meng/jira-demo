import ProjectListScreen from "./screen/project-list";
import {useAuth} from "./context/auth-context";

const AuthenticatedApp = () => {
    const { logout } = useAuth();

    return (
        <div>
            <ProjectListScreen/>
            <button onClick={logout}>登出</button>
        </div>
    )
};

export default AuthenticatedApp;
