import "./App.css";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import useScrollToTop from "./hooks/useScrollToTop";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const App: React.FC = () => {
  useScrollToTop();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CenterLayout>
          <MainLayout>
            <Outlet />
            {/* Outlet에 Router.tsx에서 매칭시켜둔 element가 렌더링됨*/}
          </MainLayout>
          <Navbar />
        </CenterLayout>
      </ThemeProvider>
    </>
  );
};

const MainLayout = styled.div`
  width: 100vw;
  padding: 18px;
  max-width: 450px;
  height: 100%;
  min-height: 932px;
  @media screen and (min-height: 933px) {
    height: 100vh;
  }

  background-color: ${({ theme }) => theme.colors.bgColor};
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenterLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
`;

export default App;
