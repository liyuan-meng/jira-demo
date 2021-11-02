import React, {ReactNode, useState} from "react";
import * as auth from '../auth-provider';
import {User} from "../screen/project-list/list";

interface authForm {
    username: string;
    password: string;
}

const AuthContext = React.createContext<{ user: User | null; login: (form: authForm) => Promise<void>; register: (form: authForm) => Promise<void>; logout: () => Promise<void> } | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (form: authForm) => auth.login(form).then(res => setUser(res));
    const register = (form: authForm) => auth.register(form).then(setUser);
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
