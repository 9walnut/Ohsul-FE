import React from "react";

import Header from "../../components/common/Header";
import KakaoMap01 from "../../components/common/KakaoMap01";
import ToggleBtn from "../../components/nearAlcohol/ToggleBtn";

const NearAlcoholPage: React.FC = () => {
  return (
    <>
      <Header title="내 주변의 술" />
      <KakaoMap01 width="90%" height="700px" />
      <div>NearAlcoholPage</div>
      <ToggleBtn />
    </>
  );
};

export default NearAlcoholPage;
