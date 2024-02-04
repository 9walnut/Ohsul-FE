import React from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import KakaoMap01 from "../../components/common/KakaoMap01";
import ToggleBtn from "../../components/nearAlcohol/ToggleBtn";
import CardCol from "../../components/common/CardCol";

const NearAlcoholPage: React.FC = () => {
  return (
    <>
      <PageLayout>
        <Header title="내 주변의 술" />
        <KakaoMap01 width="100%" height="700px" />
        <CardCol
          barName="언더그라운드"
          barImg="/assets/images/common_AlternateImage.png"
        />
        <CardCol
          barName="언더그라운드"
          barImg="/assets/images/common_AlternateImage.png"
        />
        <ToggleBtn />
      </PageLayout>
    </>
  );
};

export default NearAlcoholPage;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
