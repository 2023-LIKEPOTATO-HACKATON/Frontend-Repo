import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ScrollContainer } from "react-indiana-drag-scroll";

import RecommemdProduct from "../components/main/RecommendList";
import Arrow from "../assets/images/rightArrow.png";
import { getFeaturedProduct } from "../librarys/store-api";
import { useEffect } from "react";
import Poster from "../assets/images/poster.png";

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 300px;
  height: 500px;
  padding: 30px 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  color: #31422E;
  font-weight: 800;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto; 
`;

const ConfirmButton = styled.button`
  width: 300px;
  height: 60px;
  background-color: #31422E;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: -55px;
`;

const Main = () => {
  const [productList, setProductList] = useState([]);
  const [deadlineItems, setDeadlineItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [showModal, setShowModal] = useState(true);

  const recentFilteredProducts =
    categoryId !== undefined
      ? recentItems.filter((product) => product.category === categoryId)
      : recentItems;

      
      const handleCloseModal = () => {
        setShowModal(false);
      };

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
      {showModal && (
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>공지사항</ModalTitle>
          <ModalImage src={Poster} alt="공지사항 이미지" />
          <ConfirmButton onClick={handleCloseModal}>확인</ConfirmButton>
        </ModalContainer>
      </ModalOverlay>
    )}
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
                market={item.market}
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