import LoginScreen from "./login";
import RegisterScreen from "./register";
import { useState } from "react";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const onToggleClick = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={onToggleClick}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};

export default UnauthenticatedApp;
