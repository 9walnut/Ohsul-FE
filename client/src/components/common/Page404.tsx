import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageLayout>
        <Header title="404 error" />
        <TitleBox>
          <TitleParagraph onClick={() => navigate("/")}>
            메인 화면으로 돌아가기
          </TitleParagraph>
        </TitleBox>
      </PageLayout>
    </>
  );
};
export default Page404;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;
const TitleParagraph = styled.div`
  font-family: ${({ theme }) => theme.fonts.ydFont};
  cursor: pointer;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
