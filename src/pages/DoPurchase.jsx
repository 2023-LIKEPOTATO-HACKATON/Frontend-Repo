import styled from "styled-components";
import SimpleBar from "simplebar-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../librarys/store-api";
import { useNavigate } from "react-router-dom";

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

const Title = styled.p`
  font-size: 16px;
  font-weight: 800;
  color: #151515;
  margin: 24px 0;
  margin-top: 60px;
  margin-left: 20px;
  margin-bottom: -10px;
`;

const ProductImage = styled.img`
  width: 55px;
  height: 55px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
  margin-left: 20px;
`;

const ProductName = styled.p`
  font-size: 12px;
  color: #667080;
  margin-left: 15px;
`;

const ProductPrice = styled.p`
  font-size: 15px;
  color: #667080;
  margin-left: auto;
  margin-right: 20px;
`;

const TotalAmount = styled.p`
  font-size: 13px;
  color: #667080;
  text-align: right;
  margin-right: 340px;
`;

const TotalAmountValue = styled.p`
  font-size: 22px;
  color: #151515;
  text-align: right;
  margin-top: -20px;
  margin-right: 10px;
  font-weight: 800;
`;

const PhoneNumberTitle = styled.p`
  font-size: 16px;
  color: #151515;
  margin-top: 24px;
  margin-left: 20px;
  font-weight: 800;
`;

const PhoneNumberInput = styled.input`
  background-color: #f6f4f2;
  width: 363px;
  height: 40px;
  border: none;
  margin-top: 8px;
  padding: 0 12px;
  margin-left: 20px;
  border-radius: 10px;
`;

const Divider = styled.div`
  width: calc(100% + 48px);
  margin: 24px -24px;
  border-top: 1px dashed rgba(21, 21, 21, 0.3);
`;

const AddTotalAmountTitle = styled.p`
  font-size: 16px;
  color: #151515;
  margin-top: 24px;
  margin-left: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const AmountTitle = styled.p`
  font-size: 14px;
  color: #151515;
  margin-left: 60px;
  margin-bottom: 4px;
  font-weight: 400;
`;

const AmountValue = styled.p`
  font-size: 14px;
  color: #151515;
  text-align: right;
  margin-right: 60px;
  margin-bottom: 4px;
  font-weight: 400;
  margin-top: -10px;
`;

const CreditCashTitle = styled.p`
  font-size: 14px;
  color: #151515;
  margin-left: 60px;
  margin-bottom: 4px;
  font-weight: 400;
`;

const CreditCashValue = styled.p`
  font-size: 14px;
  color: #151515;
  margin-right: 60px;
  text-align: right;
  margin-bottom: 4px;
  font-weight: 400;
  margin-top: -10px;
`;

const CreditCheckTitle = styled.p`
  font-size: 16px;
  color: #151515;
  margin-top: 24px;
  margin-left: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #151515;
  text-align: center;
  font-weight: 400;
  margin-top: 30px;
  white-space: pre-wrap;
`;

function DoPurchase() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct({
            name: data.name,
            image: data.coverImage,
            price: data.discount || data.price,
            totalPrice: data.price,
          });
          const original = data.price;
          const discount = data.discount;
          const final = original - discount;

          setOriginalPrice(original);
          setDiscountAmount(discount);
          setFinalPrice(final);
        }
      } catch (error) {
        console.error("Error loading product data:", error);
      }
    })();
  }, [id]);

  if (!product) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  const handlePayment = () => {
    navigate(`/compeletepurchase/${id}`, { state: { finalPrice: finalPrice } });
  };

  return (
    <Container>
      <Title>주문내역</Title>
      <Divider />
      <ProductInfo>
        <ProductImage src={product.image} alt="Product" />
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{discountAmount.toLocaleString()}원</ProductPrice>
      </ProductInfo>
      <Divider />
      <TotalAmount>총 상품 금액</TotalAmount>
      <TotalAmountValue>{discountAmount.toLocaleString()}원</TotalAmountValue>
      <PhoneNumberTitle>전화번호</PhoneNumberTitle>
      <PhoneNumberInput placeholder="전화번호를 입력하세요" />
      <AddTotalAmountTitle>합계 금액</AddTotalAmountTitle>
      <AmountTitle>원가</AmountTitle>
      <AmountValue>{originalPrice.toLocaleString()}원</AmountValue>
      <AmountTitle>할인 금액</AmountTitle>
      <AmountValue>{finalPrice.toLocaleString()}원</AmountValue>
      <AmountTitle>최종 결제 금액</AmountTitle>
      <AmountValue>{discountAmount.toLocaleString()}원</AmountValue>
      <CreditCheckTitle>최종 확인</CreditCheckTitle>
      <CreditCashTitle>결제 금액</CreditCashTitle>
      <CreditCashValue>{discountAmount.toLocaleString()}원</CreditCashValue>
      <CreditCashTitle>현재 크레딧</CreditCashTitle>
      <CreditCashValue>13,040원</CreditCashValue>
      <CreditCashTitle>남은 크레딧</CreditCashTitle>
      <CreditCashValue>7,740원</CreditCashValue>
      <InfoText>
        {
          "상품구매 후, 유효기간 연장 및 환불 불가 등\n구매시 유의 사항을 확인했으며, 정보 제공에 동의합니다."
        }
      </InfoText>
      <Spacer />
      <BottomBox onClick={handlePayment}>결제하기</BottomBox>
    </Container>
  );
}

export default DoPurchase;
