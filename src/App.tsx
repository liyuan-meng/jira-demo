import React from 'react';
import './App.css'
import {useAuth} from "./context/auth-context";
import AuthenticatedApp from './authenticated-app';
import UnauthenticatedApp from './unauthenticated-app';

function App() {
    // 为什么要用 user 而不是 token 来判断：因为 user 在 context 定义，更改 user 可以让组件重新渲染。
    const { user } = useAuth();

    return (
        <div className="App">
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp/>}
        </div>
    );
}

export default App;
