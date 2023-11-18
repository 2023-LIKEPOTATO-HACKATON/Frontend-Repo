import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileImage from "../assets/images/profile.png";
import SimpleBar from "simplebar-react";
import LogoImage from "../assets/images/logo.svg";

import { show } from "../redux/menuSlice.js";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { selectCount } from "../redux/modalSlice.js";

const Content = styled(SimpleBar)`
  width: 100%;
  height: 100%;
  flex-shrink: 1;
  overflow: auto;

  &.freeze > .simplebar-track {
    display: none;
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

const Header = styled.div`
  position: fixed;
  max-width: 430px;
  width: 100%;
  background-color: #ffffff;
  color: #151515;
  display: flex;
  flex-direction: column;
  z-index: 2;

  transition:
    transform 0.2s,
    opacity 0.2s;

  &.hidden {
    transform: translateY(-15%);
    opacity: 0;
    pointer-events: none;
  }
`;

const TitleWrapper = styled.div`
  padding: 8px 16px;
  width: 100%;
  height: 64px;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  object-fit: contain;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  padding: 8px;
  box-sizing: content-box;
  cursor: pointer;

  &:hover {
    background-color: #dfdfdf;
  }
`;


const Container = styled.div`
  max-width: 500px;
  height: calc(var(--vh) * 100);
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

function HeaderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const getSelected = (value) => (pathname === value ? "selected" : "");
  const modalStatus = useSelector(selectCount) > 0;
  const scrollElement = useRef();
  const headerElement = useRef();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setHeaderHeight(headerElement.current.offsetHeight);
    const element = scrollElement.current;
    element.addEventListener("scroll", (e) =>
      setVisible(e.target.scrollTop <= headerHeight * 0.5),
    );
    return () =>
      element.removeEventListener("scroll", (e) =>
        setVisible(e.target.scrollTop <= headerHeight * 0.5),
      );
  }, [headerHeight]);

  return (
    <Container>
      <Header className={visible ? "" : "hidden"} ref={headerElement}>
        <TitleWrapper>
          <Logo src={LogoImage} />
          <ImageContainer>
            <Image
              src={ProfileImage}
              alt="프로필"
              onClick={() => navigate("/profile")}
            />
          </ImageContainer>
        </TitleWrapper>
      </Header>
      <Content
        className={modalStatus ? "freeze" : null}
        style={{ paddingTop: headerHeight + "px" }}
        scrollableNodeProps={{ ref: scrollElement }}
      >
        <Outlet />
      </Content>
    </Container>
  );
}

export default HeaderPage;
