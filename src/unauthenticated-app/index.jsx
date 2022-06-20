import LoginScreen from "./login";
import RegisterScreen from "./register";
import { useState } from "react";
import { Button, Card } from "antd";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const onToggleClick = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={onToggleClick}>
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};

export default UnauthenticatedApp;
