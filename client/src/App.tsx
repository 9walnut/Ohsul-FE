import React from "react";
import "./App.css";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import KakaoMap01 from "./components/KakaoMap01";
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <>
      <CenterLayout>
        <MainLayout>
          <Header />
          <KakaoMap01 />
          <Outlet />
          {/* Outlet에 Router.tsx에서 매칭시켜둔 element가 렌더링됨*/}
          <Navbar />
        </MainLayout>
      </CenterLayout>
    </>
  );
};

const MainLayout = styled.div`
  width: 100%;
  max-width: 430px;
  background-color: #f4ede6;
  text-align: center;
`;

const CenterLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
`;

export default App;
