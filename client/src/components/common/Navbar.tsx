import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <>
      <NavbarLayout>
        <NavbarList>
          <NavbarItem>
            <img src="/assets/images/navbar_today.png" alt="today" />
            <p>내 주변의 술</p>
          </NavbarItem>
        </NavbarList>
        <NavbarList>
          <NavbarItem>
            <img src="/assets/images/navbar_home.png" alt="home" />
            <p>홈</p>
          </NavbarItem>
        </NavbarList>
        <NavbarList>
          <NavbarItem>
            <img src="/assets/images/navbar_search.png" alt="search" />
            <p>오늘의 술 찾기</p>
          </NavbarItem>
        </NavbarList>
      </NavbarLayout>
    </>
  );
};

export default Navbar;

const NavbarLayout = styled.nav`
  width: 100vw;
  max-width: 430px;
  height: 78px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: 999;
  background-color: #7588a3;
`;

const NavbarList = styled.ul`
  width: 33vw;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #8396b0;
  }

  &:active {
    background-color: #5e7392;
  }
`;

const NavbarItem = styled.li`
  p {
    margin-top: 8px;
    font-size: 13px;
    color: #fbf7f5;
  }
`;
