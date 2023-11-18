import { styled } from "styled-components";
import ProductType from "../ProductType";
import { useMemo } from "react";
import { categorys } from "../../librarys/data.js";

const Page = styled.div`
  /* width: 470px; */
  height: 125px;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #eef1f4;
  border-bottom: 1px solid #eef1f4;
  margin-right: 10px;
  padding-top: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 105px;
  height: 105px;
  border-radius: 10px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 30px 12px;
  color: rgba(21, 21, 21, 0.3);
`;

const MarketTitle = styled.p`
  font-size: 10px;
  font-weight: 400;
  line-height: 22px;
  color: #667080;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: #151515;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: 1000;
  line-height: 22px;
  color: #151515;
  margin: 20px 0 0 0;
`;

const DiscountRate = styled.p`
  font-size: 14px;
  font-weight: 800;
  color: #D94A56;
  margin-top:-15px;
  margin-left: 200px;
`;

const RecommendList = ({ src, name, market, price, discount }) => {
  const discountRate = useMemo(() => {
    if (discount && price > 0 && discount < price) {
      return Math.round(((price - discount) / price) * 100);
    }
    return 0;
  }, [price, discount]);

  return (
    <Page>
      <Image src={src} alt="상품이미지" />
      <Detail>
        <MarketTitle> {market} </MarketTitle>
        <Title> {name} </Title>
        <Price> {discount ? `${discount.toLocaleString()}원` : `${price.toLocaleString()}원`} </Price>
        {discount ? <DiscountRate>-{discountRate}%</DiscountRate> : null}
      </Detail>
    </Page>
  );
};

export default RecommendList;
