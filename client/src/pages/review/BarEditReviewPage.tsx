import React, { useState } from "react";
import { useRef } from "react";
import * as S from "./BarPageStyle";
import Header from "../../components/common/Header";
import StarRating from "../../components/common/StarRating";
import BackButton from "../../components/common/BackButton";
import TagBox from "../../components/ohsulTag/TagBox";
import axios from "axios";

const DUMMYTags = {
  alcohol: ["alcohol_1", "alcohol_2", "alcohol_5"],
  music: ["music_3", "music_5"],
  mood: ["mood_1", "mood_3"],
  etc: ["etc_1"],
  snack: ["snack_2"],
};

const BarEditReviewPage = () => {
  const selectImg = useRef<HTMLInputElement>(null);
  const [nickName, setNickName] = useState("");
  const [reviewPw, setReviewPw] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [score, setScore] = useState(1);
  const [content, setContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const img = e.target.files[0];
      //@ts-ignore
      setReviewImg(img);
      const formData = new FormData();
      formData.append("file", img);
      console.log("사진들어왓기약아악", formData);
    }
  };
  const barId = 4;
  const patchReview = async () => {
    const formData = new FormData();
    if (reviewImg) {
      formData.append("reviewImg", reviewImg);
    }
    formData.append("content", content);
    formData.append("score", score.toString());
    formData.append("reviewPw", reviewPw);
    formData.append("nickname", nickName);
    formData.append("alcoholTags", JSON.stringify(DUMMYTags.alcohol));
    formData.append("musicTags", JSON.stringify(DUMMYTags.music));
    formData.append("moodTags", JSON.stringify(DUMMYTags.mood));
    try {
      const res = await axios.patch(`/api/ohsul/${barId}/review`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("patchReview err", error);
    }
  };

  return (
    <>
      <Header title="리뷰 수정" />
      <BackButton />
      {!isLogin && (
        <S.InputBoxWrapper>
          <S.InputBox>
            <S.ExplainInput>닉네임</S.ExplainInput>
            <S.StyledInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNickName(e.target.value);
              }}
              placeholder="리뷰 작성 시 사용할 닉네임을 입력해주세요."
            />
          </S.InputBox>
          <S.InputBox>
            <S.ExplainInput>비밀번호</S.ExplainInput>
            <S.StyledInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReviewPw(e.target.value);
              }}
              placeholder="리뷰 수정, 삭제 시 비밀번호가 일치해야합니다."
            />
          </S.InputBox>
        </S.InputBoxWrapper>
      )}

      <S.ExplainBox>
        태그는 각 최소 1개씩 필수입니다 ! (각 최대 3개)
      </S.ExplainBox>
      {/* <TagBox checkedTags={DUMMYTags} disabled={true} /> */}
      <S.ExplainBox>별점은 필수 선택입니다 !</S.ExplainBox>
      <StarRating ratingIndex={score} setRatingIndex={setScore} />

      <S.ImgUploadWrapper>
        <S.ImgBox>
          {reviewImg ? (
            <img src={reviewImg} />
          ) : (
            <img src="/assets/images/common_AlternateImage.png" />
          )}
        </S.ImgBox>

        <input
          type="file"
          onChange={onChangeImg}
          ref={selectImg}
          style={{ display: "none" }}
        />

        <S.ImgUploadBtn onClick={() => selectImg.current?.click()}>
          업로드
        </S.ImgUploadBtn>
      </S.ImgUploadWrapper>
      <S.ContentWrapper>
        <S.ContentBox
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
        />
      </S.ContentWrapper>
      <S.Button onClick={patchReview}>리뷰 수정 하기</S.Button>
    </>
  );
};

export default BarEditReviewPage;
