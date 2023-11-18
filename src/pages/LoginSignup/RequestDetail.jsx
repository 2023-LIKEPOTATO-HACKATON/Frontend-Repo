import styled from "styled-components";

import { useLocation } from "react-router-dom";

import HeaderTitle from "../../components/HeaderTitle.jsx";
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

  background-color: #589e5b;
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
  text-align: center;
`;

const ContentText = styled.p`
  font-size: 14px;
  color: #151515;
  text-align: center;
`;

function RequestDetail() {
  const location = useLocation();
  const requestData = location.state?.requestData || {};

  return (
    <Container>
      <HeaderTitle to="/userProfile" title="인증 요청 보기" />
      <VideoContainer></VideoContainer>
      {requestData.approved ? (
        <>
          <TitleText>크레딧 지급</TitleText>
          <ContentText>{requestData.credit}원</ContentText>
        </>
      ) : (
        <>
          <TitleText>반려사유</TitleText>
          <ContentText>{requestData.rejectionReason}</ContentText>
        </>
      )}
      <Spacer />
      <BottomBox>확인</BottomBox>
    </Container>
  );
}

export default RequestDetail;
