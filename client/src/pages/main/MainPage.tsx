import React from "react";

import Header from "../../components/common/Header";
import ExplainBox from "../../components/main/ExplainBox";

const MainPage: React.FC = () => {
  return (
    <>
      <Header title="오늘의 술" />
      <ExplainBox />
      <div>메인 떴냐</div>
    </>
  );
};

export default MainPage;
