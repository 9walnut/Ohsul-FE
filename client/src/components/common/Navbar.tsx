import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleIsLogin = () => {
    if (isLogin) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <NavbarLayout>
        <StyledNavLink to={"/nearAlcohol"}>
          <NavbarList>
            <NavbarItem>
              <img src="/assets/images/navbar_today.png" alt="today" />
              <p>내 주변의 술</p>
            </NavbarItem>
          </NavbarList>
        </StyledNavLink>
        <StyledNavLink to={"/main"}>
          <NavbarList>
            <NavbarItem>
              <img src="/assets/images/navbar_home.png" alt="home" />
              <p style={{ width: "70px" }}>홈</p>
            </NavbarItem>
          </NavbarList>
        </StyledNavLink>
        <StyledNavLink to={"/searchAlcohol"}>
          <NavbarList>
            <NavbarItem>
              <img src="/assets/images/navbar_search.png" alt="search" />
              <p>오늘의 술 찾기</p>
            </NavbarItem>
          </NavbarList>
        </StyledNavLink>
        <NavbarOnClick onClick={handleIsLogin}>
          <NavbarList>
            <NavbarItem>
              <img src="/assets/images/navbar_mypage.png" alt="mypage" />
              {isLogin ? <p>마이페이지</p> : <p>로그인</p>}
            </NavbarItem>
          </NavbarList>
        </NavbarOnClick>
      </NavbarLayout>
    </>
  );
};

export default Navbar;

const NavbarLayout = styled.nav`
  font-family: YeongdeokSea;
  width: 100vw;
  max-width: 430px;
  height: 78px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: #7588a3;
`;

const NavbarList = styled.ul`
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #8396b0;
  }
`;

const StyledNavLink = styled(NavLink)`
  width: 33vw;
  text-decoration: none;
  &.active {
    background-color: #5e7392;
  }
`;

const NavbarOnClick = styled.div`
  width: 33vw;
  &.active {
    background-color: #5e7392;
  }
`;
const NavbarItem = styled.li`
  padding: 12px;
  p {
    margin-top: 8px;
    font-size: 13px;
    color: #fbf7f5;
  }
`;
