import styled from "styled-components";
import HeaderTitle from "../components/HeaderTitle.jsx";

import SimpleBar from "simplebar-react";
import { useLocation, useParams ,  useNavigate} from 'react-router-dom';

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
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #31422E;
  text-align: center;
  
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

const InfoText= styled.p`
  font-size: 14px;
  color: #151515;
  text-align: center;
  font-weight: 400;
  margin-top: 30px;
  white-space: pre-wrap; 
`;

const CreditCashTitle= styled.p`
  font-size: 14px;
  color: #151515;
  margin-left: 60px;
  margin-bottom: 4px;
  font-weight: 400;
`;

const CreditCashValue= styled.p`
  font-size: 14px;
  color: #151515;
  margin-right: 60px;
  text-align: right;
  margin-bottom: 4px;
  font-weight: 400;
`;
 
const CreditCheckTitle = styled.p`
  font-size: 16px;
  color: #151515;
  margin-top: 24px;
  margin-left: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

function CompeletePurchase() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const finalPrice = location.state?.finalPrice || 0;

  // "홈으로" 버튼 클릭 시 /main으로 이동
  const goToHome = () => {
    navigate('/main');
  };


  return (
    <Container>
      <HeaderTitle to="/userProfile" title="분리배출 인증하기" />
      <Text>결제가 완료되었습니다!</Text>
      <InfoText>
        {"구매한 기프티콘은\n문자를 통해 전달되었습니다."}
      </InfoText>
      <CreditCheckTitle>최종 확인</CreditCheckTitle>
      <CreditCashTitle>결제 크레딧</CreditCashTitle>
      <CreditCashValue>{finalPrice.toLocaleString()}원</CreditCashValue>
      <CreditCashTitle>현재 크레딧</CreditCashTitle>
      <CreditCashValue>원</CreditCashValue>
      <Spacer />
      <BottomBox onClick={goToHome}>홈으로</BottomBox>
    </Container>
  );
}

export default CompeletePurchase;
