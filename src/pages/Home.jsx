import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Image from "../assets/images/BB.png";

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
  max-width: 530px;
  max-height: 1024px;
  margin-bottom: -60px;
  width: 120%;
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
`;

const SignupButton = styled(StyledButton)`
  border: 1px solid #FFD02C;
  color: #FFD02C;
  background-color: #ffffff;

`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Background src={Image} />
      <Spacer />
      <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
      <SignupButton onClick={() => navigate("/signup")}>회원가입</SignupButton>
    </Container>
  );
}

export default Home;
