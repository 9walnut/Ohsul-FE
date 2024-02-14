import React from "react";
import { useState } from "react";
import Header from "../../components/common/Header";
import ExplainBox from "../../components/main/ExplainBox";
import StarRating from "../../components/common/StarRating";
import CommonModal from "../../components/common/CommonModal";
import ConfirmModal from "../../components/common/ConfirmModal";

const MainPage: React.FC = () => {
  const [ratingIndex, setRatingIndex] = useState(1);
  return (
    <>
      <Header title="오늘의 술" />
      <ExplainBox />
      <div>메인 떴냐</div>
      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
      <CommonModal
        message="메시지이이ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ"
        isClose={true}
      />
      <ConfirmModal
        message="메시지이이ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ"
        isClose={true}
      />
    </>
  );
};

export default MainPage;
