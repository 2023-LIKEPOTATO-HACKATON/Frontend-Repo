import styled from "styled-components";
import HeaderTitle from "../components/HeaderTitle.jsx";

import SimpleBar from "simplebar-react";

const Container = styled(SimpleBar)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh) * 100);
  overflow: auto;

  &.freeze > .simplebar-track {
    display: none;
  }

  & .simplebar-content {
    min-height: calc(var(--vh) * 100);
    display: flex;
    flex-direction: column;
  }

  & > .simplebar-track.simplebar-horizontal {
    height: 7px;
  }

  & > .simplebar-track.simplebar-vertical {
    width: 7px;
  }

  & .simplebar-mask {
    z-index: auto;
  }
`;

const Text = styled.p`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #31422E;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const BottomBox = styled.button`
  padding: 24px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #589E5B;
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight:800;

  transition: opacity 0.2s;
`;


function TakePictureCompelete() {

  return (
    <Container>
      <HeaderTitle to="/userProfile" title="분리배출 인증하기" />
      <Text>인증 요청을</Text>
      <Text>보냈습니다!</Text>
      <Spacer />
      <BottomBox>홈으로</BottomBox>
    </Container>
  );
}

export default TakePictureCompelete;
