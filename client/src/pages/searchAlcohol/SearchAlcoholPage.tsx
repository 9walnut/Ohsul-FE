import React from "react";
import Header from "../../components/common/Header";
import KakaoMap04 from "../../components/common/KakaoMap04";
import KakaoMap05 from "../../components/common/KakaoMap05";

const SearchAlcoholPage: React.FC = () => {
  return (
    <>
      <Header title="오늘의 술 찾기" />
      {/* 사이즈 직접 작성하면 props으로 넘어가서 이 사이즈로 적용! */}
      {/* <KakaoMap04 /> */}
      <KakaoMap05 />
      <div>SearchAlcohol</div>
    </>
  );
};

export default SearchAlcoholPage;
