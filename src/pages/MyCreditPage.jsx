import styled from "styled-components";

import HeaderTitle from "../components/HeaderTitle.jsx";

import SimpleBar from "simplebar-react";
import { useNavigate, useEffect, useState } from "react-router-dom";
import { getCreditList, getMyCreditTotal } from "../librarys/credit-api.js";

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
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

const AdvantageTitle = styled.div`
  color: #151515;
  font-size: 12px;
  font-weight: 800;
  margin-top: 10px;
  margin-left: 0px;
`;

const AdvantageMoney = styled.div`
  color: #151515;
  font-size: 16px;
  font-weight: 800;
  margin-right: 10px;
  margin-top: 10px;
`;

const AdvantageDate = styled.div`
  color: #667080;
  font-size: 10px;
  font-weight: 500;
  margin-top: 10px;
`;

const AdvantageBeforeMoney = styled.div`
  color: #667080;
  font-size: 10px;
  font-weight: 500;
  margin-right: 10px;
  margin-top: 10px;
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

  background-color: #589e5b;
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight: 800;

  transition: opacity 0.2s;
`;

const HeadText = styled.p`
  font-size: 16px;
  color: #294d23;
  margin-top: 30px;
  margin-left: 10px;
`;

const CreditAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CreditAmount = styled(Text)`
  margin-right: auto;
  margin-top: 5px;
  margin-left: 20px;
`;

const CreditCurrency = styled(Text)`
  margin-left: auto;
  margin-right: 60px;
`;

const CreditListItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 80px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomRow = styled(TopRow)`
  color: #667080;
  font-size: 10px;
`;

function MyCreditPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/takephoto");
  };

  const [creditList, setCreditList] = useState([]);
  const [creditTotal, setCreditTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const credits = await getCreditList();
      setCreditList(credits);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const creditAmount = await getMyCreditTotal();
      if (creditAmount !== null) {
        setCreditTotal(creditAmount);
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderTitle to="/userProfile" title="나의 크레딧" />
      <CreditContainer>
        <Heading>
          <TextContainer>
            <HeadText>지금 있는 크레딧</HeadText>
            <CreditAmountContainer>
              <CreditAmount>{creditTotal.toLocaleString()}</CreditAmount>
              <CreditCurrency>원</CreditCurrency>
            </CreditAmountContainer>
          </TextContainer>
        </Heading>
      </CreditContainer>
      {creditList.map((item, index) => (
        <CreditListItem key={index}>
          <TopRow>
            <AdvantageTitle>{item.title}</AdvantageTitle>
            <AdvantageMoney>{item.amount}</AdvantageMoney>
          </TopRow>
          <BottomRow>
            <AdvantageDate>{item.date}</AdvantageDate>
            <AdvantageBeforeMoney>{item.beforeAmount}</AdvantageBeforeMoney>
          </BottomRow>
          {index < creditList.length - 1 && <Divider />}
        </CreditListItem>
      ))}
      <Spacer />
      <BottomBox onClick={handleButtonClick}>분리배출 인증하기</BottomBox>
    </Container>
  );
}

export default MyCreditPage;
