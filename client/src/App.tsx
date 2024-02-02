import React from "react";
import "./App.css";
import styled from "styled-components";
import { FontTest } from "./components/FontTest";

import KakaoMap01 from "./components/KakaoMap01";
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
      <CenterLayout>
        <MainLayout>
          <Header />
          <KakaoMap01 />
          <Navbar />
        </MainLayout>
      </CenterLayout>
    </>
  );
}

const MainLayout = styled.div`
  width: 100vw;
  max-width: 430px;
  height: 100vh;
  background-color: #f4ede6;
  text-align: center;
`;

const CenterLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default App;
