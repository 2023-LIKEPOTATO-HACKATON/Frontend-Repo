import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import LogoImage from "../assets/images/mainLogo.svg";

const Container = styled.div`
  padding: 64px 24px;
  min-height: calc(var(--vh) * 100);

  background: linear-gradient(182deg, #31422E 0%, #589E5B 37.5%), #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  & > * {
    z-index: 1;
  }
`;

const Background = styled.img`
  max-width: 500px;
  width: 100%;
  color: #589E5B;
  bottom: 64px;
  padding: 0 min(10%, 50px);
  position: absolute;
  object-fit: contain;

  z-index: 0;
`;

const StyledButton = styled.button`
  margin: 4px auto;
  max-width: 300px;
  width: 100%;
  text-align: center;
  padding: 12px 4px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const LoginButton = styled(StyledButton)`
  background-color: #FFD02C;
  color: white;

  &:hover {
    background-color: #FFD02C;
  }
`;

const SignupButton = styled(StyledButton)`
  border: 1px solid #FFD02C;
  color: #FFD02C;
  background-color: #ffffff;

  &:hover {
    background-color: rgba(248, 248, 248, 1);
  }
`;

const Title = styled.img`
  margin-top: 64px;
  max-width: 360px;
  width: 100%;
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Title src={LogoImage} />
      <Subtitle>내 친구를 위한 현명한 소비</Subtitle>
      <Spacer />
      <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
      <SignupButton onClick={() => navigate("/signup")}>회원가입</SignupButton>
    </Container>
  );
}

export default Home;
