import LoginScreen from "./login";
import RegisterScreen from "./register";
import { useState } from "react";
import {Card, Divider, Typography} from "antd";
import { Button } from 'antd';
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
// import {useDocumentTitle} from "../utils";

const UnauthenticatedApp = () => {
    // useDocumentTitle('请注册登录以继续', false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const onToggleClick = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
          {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        <Button type="link" onClick={onToggleClick}>
          切换到{isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export default UnauthenticatedApp;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rab(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
