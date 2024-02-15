import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import ExplainBox from "../../components/main/ExplainBox";
import StarRating from "../../components/common/StarRating";
import CommonModal from "../../components/common/CommonModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import CardRow from "../../components/common/CardRow";

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
      <CardRow />
      <br />
      <NavLink to={"/barReviews/addReview"}>리뷰페이지 이동</NavLink>
    </>
  );
};

export default MainPage;
