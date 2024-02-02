import React from "react";

import Header from "../../components/common/Header";
import KakaoMap01 from "../../components/KakaoMap01";

const NearAlcoholPage: React.FC = () => {
  return (
    <>
      <Header title="내 주변의 술" />
      <KakaoMap01 />
      <div>NearAlcoholPage</div>;
    </>
  );
};

export default NearAlcoholPage;
