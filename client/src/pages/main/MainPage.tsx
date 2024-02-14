import React from "react";
import { useState } from "react";
import Header from "../../components/common/Header";
import ExplainBox from "../../components/main/ExplainBox";
import StarRating from "../../components/common/StarRating";

const MainPage: React.FC = () => {
  const [ratingIndex, setRatingIndex] = useState(1);
  console.log(ratingIndex);
  return (
    <>
      <Header title="오늘의 술" />
      <ExplainBox />
      <div>메인 떴냐</div>
      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
    </>
  );
};

export default MainPage;
