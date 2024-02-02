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
`;

const CenterLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
`;

export default App;
