import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useAuthStore from "../../stores/useAuthStore";

const Navbar = () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  console.log("zustand Navbar isLoggedIn:", useAuthStore.getState().isLoggedIn);

  const navigate = useNavigate();

  return (
    <>
      <NavbarLayout>
        <StyledNavLink to={"/"}>
          <NavbarList>
            <NavbarItem>
              <img src="/assets/images/navbar_home.png" alt="home" />
              <p>홈</p>
            </NavbarItem>
          </NavbarList>
        </StyledNavLink>
        <StyledNavLink to={"/near"}>
          <NavbarList>
            <NavbarItem>
              <img src="/assets/images/navbar_today.png" alt="today" />
              <p>내 주변의 술</p>
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
        {/* 로그인 여부에 따른 UI & 페이지 이동 */}
        <NavbarOnClick to={isLoggedIn ? "/mypage" : "/login"}>
          <NavbarList>
            <NavbarItem>
              <img src="/assets/images/navbar_mypage.png" alt="mypage" />
              {isLoggedIn ? <p>마이페이지</p> : <p>로그인</p>}
            </NavbarItem>
          </NavbarList>
        </NavbarOnClick>
      </NavbarLayout>
    </>
  );
};

export default Navbar;

const NavbarLayout = styled.nav`
  font-family: ${({ theme }) => theme.fonts.ydFont};
  width: 100vw;
  max-width: 450px;
  margin-top: 78px;
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

const NavbarOnClick = styled(StyledNavLink)`
  &.active {
    background-color: #5e7392;
  }
`;

const NavbarItem = styled.li`
  padding: 12px;
  p {
    width: 70px;
    margin-top: 8px;
    font-size: 13px;
    color: #fbf7f5;
  }
`;
