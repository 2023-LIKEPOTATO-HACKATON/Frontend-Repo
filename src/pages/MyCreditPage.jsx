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

const Heading = styled.p`
  font-size: 16px;
  color: #294d23;
  margin-top: 10px;
`;

const TextContainer = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #31422e;
`;

const CreditContainer = styled.div`
  background-color: #f6f4f2;
  width: 100%;
  height: 125px;
`;
const AdvantageTitle= styled.div`
  color: #151515;
  font-size: 16px;
  font-weight: 800;
`
const AdvantageMoney= styled.div`
  color: #151515;
  font-size: 16px;
  font-weight: 800;
`;

const AdvantageDate = styled.div`
  color: #667080;
  font-size: 10px;
  font-weight: 500;
`;

const AdvantageBeforeMoney = styled.div`
  color: #667080;
  font-size: 10px;
  font-weight: 500;
`;
const CreditList= styled.div`

`;

const Divider = styled.div`
  width: calc(100% + 48px);
  margin: 24px -24px;
  border-top: 1px dashed rgba(21, 21, 21, 0.3);
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

function MyCreditPage() {
  return (
    <Container>
      <HeaderTitle to="/userProfile" title="나의 크레딧" />
      <CreditContainer>
        <Heading>지금 있는 크레딧</Heading>
        <TextContainer>
          <Text>10000</Text>
          <Text>원</Text>
        </TextContainer>
      </CreditContainer>
      <CreditList>
        <AdvantageTitle>무료 음료 쿠폰 (벤티 사이즈)</AdvantageTitle>
        <AdvantageMoney>- 5,300원</AdvantageMoney>
        <AdvantageDate>2023/11/18</AdvantageDate>
        <AdvantageBeforeMoney>13,040원</AdvantageBeforeMoney>
        <Divider />
      </CreditList>
      <Spacer />
      <BottomBox>분리배출 인증하기</BottomBox>
    </Container>
  );
}

export default MyCreditPage;
