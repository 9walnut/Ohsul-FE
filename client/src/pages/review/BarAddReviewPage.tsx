import React, { useState } from "react";
import Header from "../../components/common/Header";

const BarAddReviewPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header title="리뷰 등록" />
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
    </>
  );
};

export default BarAddReviewPage;
