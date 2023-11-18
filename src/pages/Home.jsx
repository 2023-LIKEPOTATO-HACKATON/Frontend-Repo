import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Image from "../assets/images/Final.png";
import LogoImage from "../assets/images/mainlogo.png";

const Container = styled.div`
  padding: 64px 24px;
  min-height: calc(var(--vh) * 100);

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
  max-width: 560px;
  max-height: 1024px;
  margin-bottom: -60px;
  width: 100%;
  color: #589e5b;
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
  background-color: #ffd02c;
  color: white;
`;

const SignupButton = styled(StyledButton)`
  border: 1px solid #ffd02c;
  color: #ffd02c;
  background-color: #ffffff;
`;

const Title = styled.img`
  margin-top: 80px;
  max-width: 360px;
  width: 100%;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Background src={Image} />
      <Title src={LogoImage} />
      <Spacer />
      <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
      <SignupButton onClick={() => navigate("/signup")}>회원가입</SignupButton>
    </Container>
  );
}

export default Home;
