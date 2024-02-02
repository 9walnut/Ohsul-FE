import React from "react";
import "./App.css";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";

const App: React.FC = () => {
  return (
    <>
      <CenterLayout>
        <MainLayout>
          <Outlet />
          {/* Outlet에 Router.tsx에서 매칭시켜둔 element가 렌더링됨*/}
          <Navbar />
        </MainLayout>
      </CenterLayout>
    </>
  );
};

const MainLayout = styled.div`
  width: 100vw;
  max-width: 430px;
  min-height: 950px;
  background-color: #f4ede6;
  text-align: center;
  position: relative;
  padding-bottom: 140px;

  /* 아래 추가했는데 혹시 하다가 이상해진다거나 하면 빼고 각 페이지에서 정렬..? */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenterLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* height: 100%; */
`;

export default App;
