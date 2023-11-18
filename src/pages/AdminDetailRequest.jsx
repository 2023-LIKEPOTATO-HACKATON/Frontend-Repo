import styled from "styled-components";

import { useLocation } from "react-router-dom";

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
  font-weight: 800;
  transition: opacity 0.2s;
`;

const VideoContainer = styled.div`
  width: 320px;
  height: 320px;
  margin: 20px auto; 
  background-color: #f0f0f0; 
`;

const TitleText = styled.p`
  font-size: 16px;
  color: #151515;
  margin-top: 20px;
  text-align: left;
  margin-left: 20px;
  font-weight: 800;
`;

const ContentText = styled.p`
  font-size: 14px;
  color: #151515;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  width: 180px;
  height: 40px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;

const ApproveButton = styled(ActionButton)`
  background-color: #31422E;
  color: #ffffff;
`;

const RejectButton = styled(ActionButton)`
  background-color: #ffffff;
  border: 1px solid #31422E;
  color: #31422E;
`;

const RejectionInput = styled.input`
  width: 370px;
  height: 40px;
  border-radius: 5px;
  background-color: #F8F8F8;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-left: 20px;
`;



function AdminDetailRequest() {
  const location = useLocation();
  const requestData = location.state?.requestData || {};


  return (
    <Container>
      <HeaderTitle to="/userProfile" title="인증 요청 보기" />
      <VideoContainer />
      <TitleText>크레딧 지급</TitleText>
      <ButtonContainer>
        <ApproveButton>승인</ApproveButton>
        <RejectButton>반려</RejectButton>
      </ButtonContainer>
      <TitleText>반려 사유</TitleText>
      <RejectionInput placeholder="반려 사유를 입력하세요" />
      <Spacer />
      <BottomBox>확인</BottomBox>
    </Container>
  );
}

export default AdminDetailRequest;
