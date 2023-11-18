import styled from "styled-components";

import { useParams, useNavigate } from "react-router-dom";
import { getOrderList } from "../../librarys/order-api";
import { useState } from "react";

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

const RequestItemContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #9B9B9B;
`;

const RequestInfo = styled.div`
  font-size: 14px;
  color: #000000;
  margin-bottom: 8px;
`;

const RequestDate = styled(RequestInfo)`
  font-weight: bold;
`;

const RequestCredit = styled(RequestInfo)`
  color: black;
`;

const RequestRejectionReason = styled(RequestInfo)`
  color: #FF0000; 
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


const dummyRequests = [
  {
    date: "2023-01-23 14:00",
    approved: true,
    credit: 500,
    rejectionReason: null
  },
  {
    date: "2023-01-24 15:30",
    approved: false,
    credit: 0,
    rejectionReason: "잘못된 분리배출"
  }
];

function ChangeDelivery() {
  const { requestId } = useParams();
  const [requests, setRequests] = useState(dummyRequests);
  const navigate = useNavigate();

  const handleRequestClick = (request) => {
    navigate(`/requestDetail/${request.date}`, { state: { requestData: request } });
  };


  return (
    <Container>
      <HeaderTitle to="/userProfile" title="인증 요청 목록 조회" />
      {requests.map((request, index) => (
        <RequestItemContainer key={index} onClick={() => handleRequestClick(request)}>
          <RequestDate>{request.date}</RequestDate>
          {request.approved ? (
            <RequestCredit>{request.credit}원</RequestCredit>
          ) : (
            <RequestRejectionReason>{request.rejectionReason}</RequestRejectionReason>
          )}
        </RequestItemContainer>
      ))}
      <Spacer />
      <BottomBox >분리배출 인증하기</BottomBox>
    </Container>
  );
}

export default ChangeDelivery;