import React, {ReactNode} from "react";
import * as auth from '../auth-provider';
import {User} from "../screen/project-list/list";
import {useMount} from "../utils";
import {http} from "../utils/http";
import {useAsync} from "../utils/use-async";
import {FullPageErrorFallback, FullPageLoading} from "../components/lib";

interface AuthForm {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', { token });
        user = data.user;
    }
    return user;
};

const AuthContext = React.createContext<{ user: User | null; login: (form: AuthForm) => Promise<void>; register: (form: AuthForm) => Promise<void>; logout: () => Promise<void> } | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {run, data: user, error, isLoading, isIdle, isError, setData: setUser} = useAsync<User | null>();

    // 初始化 user，解决登录后再次刷新页面，页面回到登录页的问题
    useMount(() => {
        run(bootstrapUser())
    });

    // 未加载和加载中
    if (isIdle || isLoading) {
        return <FullPageLoading/>
    }

    // 加载失败
    if (isError) {
        return <FullPageErrorFallback error={error}/>
    }

    const login = (form: AuthForm) => auth.login(form).then(res => setUser(res));
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};
