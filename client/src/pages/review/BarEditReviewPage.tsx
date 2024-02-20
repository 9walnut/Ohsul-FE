import React, { useState } from "react";
import Header from "../../components/common/Header";
import StarRating from "../../components/common/StarRating";

const BarEditReviewPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [ratingIndex, setRatingIndex] = useState(1);
  // 사용자가 작성한 barReview 데이터 필요

  return (
    <>
      <Header title="리뷰 수정" />
      {!isLogin && (
        <>
          <div>
            닉네임
            <input />
          </div>
          <div>
            비밀번호
            <input />
          </div>
        </>
      )}
      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
    </>
  );
};

export default BarEditReviewPage;
