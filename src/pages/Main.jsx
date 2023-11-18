import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ScrollContainer } from "react-indiana-drag-scroll";

import RecommemdProduct from "../components/main/RecommendList";
import Arrow from "../assets/images/rightArrow.png";
import { getFeaturedProduct } from "../librarys/store-api";
import { useEffect } from "react";

const PageContainer = styled.div`
  display: block;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
`;

const DetailMenu = styled.div`
  background-color: white;
  clear: both;
  margin: 25px 17px 0 17px;
  text-decoration: none;
`;

const DetailMenuTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10px 15px 0;
`;

const RecommendList = styled(ScrollContainer)`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.02em;
  margin: 0 7px;
`;

const ProductSelect = styled(Link)`
  text-decoration: none;
`;

const Heading = styled.div`
  color: #294d23;
  margin-top: -5px;
`;
const HeadText= styled.p`
  font-size: 16px;
  color: #294d23;
  margin-top: 30px;
  margin-left: 10px;
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
  color: #31422E;
`;

const CreditContainer = styled.div`
  background-color: #F6F4F2;
  width: 100%;
  height: 125px;
`;
const CreditAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CreditAmount = styled(Text)`
  margin-right: auto;
  margin-top: 10px;
  margin-left: 30px;
`;

const CreditCurrency = styled(Text)`
  margin-left: auto; 
  margin-right: 60px;
`;

const NextBtn = styled.img`
  width: 10px;
  height: 15px;
  margin: auto;
  margin-right: 0px;
  cursor: pointer;
`;


const Main = () => {
  const [productList, setProductList] = useState([]);
  const [deadlineItems, setDeadlineItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [categoryId, setCategoryId] = useState();

  const recentFilteredProducts =
    categoryId !== undefined
      ? recentItems.filter((product) => product.category === categoryId)
      : recentItems;

  useEffect(() => {
    (async () => {
      const data = await getFeaturedProduct(categoryId);
      setDeadlineItems(data.deadlineItems);
      setRecentItems(data.recentItems);
      setPopularItems(data.popularItems);
    })();
  }, [categoryId]);

  useEffect(() => {
    if (categoryId !== undefined) {
      (async () => {
        const products = await getFeaturedProduct(categoryId);
        setProductList(Array.isArray(products) ? products : []);
      })();
    } else {
      (async () => {
        const products = await getFeaturedProduct();
        setProductList(Array.isArray(products) ? products : []);
      })();
    }
  }, [categoryId]);

  return (
    <PageContainer>
      <CreditContainer>
        <Heading>
          <TextContainer>
            <HeadText>지금 있는 크레딧</HeadText>
            <CreditAmountContainer>
              <CreditAmount>10000</CreditAmount>
              <CreditCurrency>원</CreditCurrency>
            </CreditAmountContainer>
          </TextContainer>
        </Heading>
      </CreditContainer>
      <DetailMenu>
        <DetailMenuTitle>
            <Title> 최근 등록된 상품 </Title>
            <NextBtn src={Arrow} alt="자세히보기" />
        </DetailMenuTitle>
        <RecommendList>
          {recentFilteredProducts.map((item) => (
            <ProductSelect key={item.id} to={`/productDetail/${item.id}`}>
              <RecommemdProduct
                name={item.name}
                category={item.category}
                price={item.price}
                discount={item.discount}
                src={item.thumbnailImage}
              />
            </ProductSelect>
          ))}
        </RecommendList>
      </DetailMenu>
    </PageContainer>
  );
};

export default Main;