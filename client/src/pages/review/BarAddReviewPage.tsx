import React, { useState } from "react";
import { useRef } from "react";
import * as S from "./BarPageStyle";
import Header from "../../components/common/Header";
import StarRating from "../../components/common/StarRating";
import BackButton from "../../components/common/BackButton";
import TagBox from "../../components/ohsulTag/TagBox";
import axios from "axios";
import { useParams } from "react-router";
import { Tag } from "../../types/Common";

const BarAddReviewPage: React.FC = () => {
  const selectImg = useRef<HTMLInputElement>(null);
  const { barId } = useParams();
  const [nickName, setNickName] = useState("");
  const [reviewPw, setReviewPw] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [score, setScore] = useState(1);
  const [content, setContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);

  const [tags, setTags] = useState<Tag>({
    alcohol: [],
    music: [],
    mood: [],
    etc: [],
    snack: [],
  });

  const [tags2, setTags2] = useState<Tag>({
    alcohol: [],
    music: [],
    mood: [],
  });

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const img = e.target.files[0];
      //@ts-ignore
      setReviewImg(img);
    }
  };

  const postReview = async () => {
    const formData = new FormData();

    // if (reviewImg) {
    //   formData.append("reviewImg", reviewImg); // 이미지 파일 추가
    // }

    // BarReviewDTO 데이터를 JSON 문자열로 변환하여 추가
    const reviewData = JSON.stringify({
      content: content,
      score: score,
      nickname: nickName,
      reviewPw: reviewPw,
      userId: "qwer1234",
      ...tags2,
    });

    console.log("데이터임", reviewData);

    formData.append(
      "barReviewDTO",
      new Blob([reviewData], { type: "application/json" })
    );

    try {
      const res = await axios.post(`/api/ohsul/${barId}/review`, formData);
      console.log("Review submission response:", res);
    } catch (error) {
      console.error("Review submission error:", error);
    }
  };

  return (
    <>
      <Header title="리뷰 등록" />
      <BackButton />
      {isLogin && (
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
      <TagBox checkedTags={tags} isReview={true} />
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
          accept=".png, .jpeg, .jpg"
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
      <S.Button onClick={postReview}>리뷰 작성하기</S.Button>
    </>
  );
};

export default BarAddReviewPage;
