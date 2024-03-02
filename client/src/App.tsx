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
          <CenterTextWrapper>
            {/* <CenterText>오늘의 술🍺</CenterText> */}
            <MainLayout>
              <Outlet />
              {/* Outlet에 Router.tsx에서 매칭시켜둔 element가 렌더링됨*/}
            </MainLayout>
            <Navbar />
          </CenterTextWrapper>
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
    height: 100vmax;
  }

  background-color: ${({ theme }) => theme.colors.bgColor};
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 5px 18px -7px;
`;

const CenterLayout = styled.div`
  /* background: linear-gradient(
    91.89978272135795deg,
    rgba(239, 225, 210, 1) 21.958428939918665%,
    rgba(219, 182, 140, 1) 74.17679426918728%
  ); */

  background-image: url("/assets/images/background_beige.jpg");

  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
`;

const CenterTextWrapper = styled.div`
  /* position: relative; */
`;

const CenterText = styled.div`
  position: absolute;
  font-size: 120px;
  left: 200px;
  top: 20%;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  color: ${({ theme }) => theme.colors.darkFont};
  z-index: 20;
`;

export default App;
