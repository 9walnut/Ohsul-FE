import React, { useState } from "react";
import * as S from "./BarPageStyle";
import Header from "../../components/common/Header";
import StarRating from "../../components/common/StarRating";
import BackButton from "../../components/common/BackButton";
import TagBox from "../../components/ohsulTag/TagBox";

const BarAddReviewPage = () => {
  const DUMMYTags = {
    alcohol: ["alcohol_1", "alcohol_2", "alcohol_5"],
    music: ["music_3", "music_5"],
    mood: ["mood_1", "mood_3"],
    etc: ["etc_1"],
    snack: ["snack_2"],
  };
  const [isLogin, setIsLogin] = useState(true);

  const [ratingIndex, setRatingIndex] = useState(1);

  return (
    <>
      <Header title="리뷰 등록" />
      <BackButton />
      {isLogin && (
        <S.InputBoxWrapper>
          <S.InputBox>
            닉네임
            <S.StyledInput />
          </S.InputBox>
          <S.InputBox>
            비밀번호
            <S.StyledInput />
          </S.InputBox>
        </S.InputBoxWrapper>
      )}

      <S.ExplainBox>태그는 각 최소 1개씩 필수입니다 !</S.ExplainBox>
      <TagBox checkedTags={DUMMYTags} disabled={true} />
      <S.ExplainBox>별점은 필수 선택입니다 !</S.ExplainBox>
      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
    </>
  );
};

export default BarAddReviewPage;
