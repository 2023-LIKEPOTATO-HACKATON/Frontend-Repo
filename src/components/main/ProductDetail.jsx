import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "../Button";
import ProductOrder from "../product-detail/ProductOrder";

import HeaderTitle from "../HeaderTitle.jsx";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ImageModal from "./ImageModal.jsx";
import NoticeModal from "./NoticeModal.jsx";

dayjs.extend(duration);

import { getProduct } from "../../librarys/store-api.js";

import SimpleBar from "simplebar-react";
import { useRef } from "react";
import { selectIsAdmin } from "../../redux/userSlice";
import { show } from "../../redux/modalSlice";

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

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  background-color: #eef1f4;
`;

const ProductInfoContainer = styled.div`
  width: 100%;
  padding: 18px 25px 0 25px;
`;

const ProductName = styled.p`
  color: #151515;
  font-size: 17.29px;
  font-weight: 400;
  line-height: 25px;
`;

const SubProductInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -2px;
`;

const Percent = styled.p`
  margin-right: 7px;
  font-size: 22px;
  font-weight: 700;
  color: #d94a56;
  line-height: 34.57px;
`;

const Price = styled.p`
  font-size: 22px;
  font-weight: 700;
  color: #151515;
  line-height: 34.57px;
`;

const GroupPurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 20px 0;
`;

const GPSubContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -13px;
`;

const GPTitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: -0.02em;
  color: #151515;
`;

const OrderBtn = styled(Button)`
  width: 100%;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.02em;
  text-align: center;
  background-color: #589e5b;
  border: none;
  box-shadow: none;
  margin-top: 5px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;

  transition: opacity 0.2s;

  justify-content: center;

  &.hidden {
    opacity: 0;
  }
`;

const OverlayBackground = styled.div`
  max-width: 500px;
  width: 100%;
  background-color: #00000033;
`;
const SellerName = styled.p`
  color: #667080;
  font-size: 10px;
  font-weight: 400;
  text-align: right;
  margin-bottom: 10px;
`;

const ModifiedProductName = styled(ProductName)`
  font-size: 16px;
  font-weight: 800;
`;

const OriginalPrice = styled.p`
  color: #667080;
  font-size: 10px;
  font-weight: 400;
`;

const FinalPrice = styled(Price)`
  font-size: 16px;
  font-weight: 800;
`;

const DiscountRate = styled(Percent)`
  margin-left: 350px;
  font-size: 16px;
  color: #d94a56;
`;

const ProductDetail = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [data, setData] = useState({});
  const [percent, setPercent] = useState(0);
  const [period, setPeriod] = useState("");
  const [openOrder, setOpenOrder] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await getProduct(id);

      if (data) {
        setPercent(Math.floor((1 - data.discount / data.price) * 100));
        setInterval(() => {
          const ms = dayjs(data.endDate) - dayjs();

          if (ms <= 0) {
            setPeriod("00:00:00:00");
          } else {
            const duration = dayjs.duration(ms);
            setPeriod(
              [
                duration.days(),
                duration.hours(),
                duration.minutes(),
                duration.seconds(),
              ]
                .map((item) => item.toString().padStart(2, "0"))
                .join(":"),
            );
          }
        }, 200);

        setData(data);
      }
    })();
  }, [id]);

  const onClickOrder = () => setOpenOrder((prev) => !prev);

  function onImageClick() {
    if (isAdmin) {
      dispatch(show("upload_image"));
    }
  }

  return (
    <Container scrollableNodeProps={{ ref }}>
      <ImageModal />
      <NoticeModal />
      <HeaderTitle url="/main" title="" />
      {openOrder && (
        <Overlay
          className={openOrder ? null : "hidden"}
          onClick={() => setOpenOrder(false)}
        >
          <OverlayBackground />
        </Overlay>
      )}
      <Image onClick={onImageClick} src={data.coverImage} alt="상품 이미지" />
      <ProductInfoContainer>
        <SellerName>{data.seller}</SellerName>
        <ModifiedProductName>{data.name}</ModifiedProductName>
        <OriginalPrice>
          정가 : {(data.price || 0).toLocaleString()}원
        </OriginalPrice>
        <SubProductInfo>
          <FinalPrice>
            {(data.discount || data.price || 0).toLocaleString()}원
          </FinalPrice>
          <DiscountRate style={{ display: percent > 0 ? null : "none" }}>
            {percent}%
          </DiscountRate>
        </SubProductInfo>
        <OrderBtn onClick={onClickOrder}> 구매하기 </OrderBtn>
        {openOrder && <ProductOrder show={openOrder} />}
      </ProductInfoContainer>
    </Container>
  );
};

export default ProductDetail;
