import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEmail, selectIsAdmin, selectName } from "../../redux/userSlice";

import HeaderTitle from "../../components/HeaderTitle.jsx";
import MenuItem from "../../components/MenuItem.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(var(--vh) * 100);
`;

const Title = styled.p`
  margin: 4px 24px;
  font-size: 24px;
  font-weight: 700;
  color: #151515;
`;

const Text = styled.p`
  margin: 16px 24px;
  font-size: 14px;
  font-weight: 400;
  color: #151515;
`;

function UserProfile() {
  const email = useSelector(selectEmail);
  const name = useSelector(selectName);
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <Container>
      <HeaderTitle url="/main" title="회원정보" />
      <Title style={{ marginTop: "32px" }}>안녕하세요</Title>
      <Title>
        {name}
        {isAdmin ? "(관리자)" : null} 님
      </Title>
      <Text>{email}</Text>
      <MenuItem title="나의 크레딧 정보" to="/mycredit" />
      {isAdmin ? (
        <MenuItem title="인증요청 목록 조회" to="/admincheckrequest" />
      ) : (
        <MenuItem title="인증요청 목록 조회" to="/checkdelivery" />
      )}
      <MenuItem title="로그아웃" to="/checkdelivery" />
    </Container>
  );
}

export default UserProfile;
