import React from "react";

import Header from "../../components/common/Header";
import KakaoMap01 from "../../components/KakaoMap01";

const SearchAlcoholPage: React.FC = () => {
  return (
    <>
      <Header title="오늘의 술 찾기" />
      <KakaoMap01 />
      <div>SearchAlcohol</div>;
    </>
  );
};

export default SearchAlcoholPage;
