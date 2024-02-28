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
import { TagsState, SetTagsFunction } from "../../types/OhsulTag";
import useAuthStore from "../../stores/useAuthStore";

const BarAddReviewPage: React.FC = () => {
  const selectImg = useRef<HTMLInputElement>(null);
  // const { barId } = useParams();
  const barId = 2;
  const { userNickname } = useAuthStore.getState();
  const [nickName, setNickName] = useState(userNickname);
  const [reviewPw, setReviewPw] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [score, setScore] = useState(1);
  const [content, setContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);

  const [tags, setTags]: [TagsState, SetTagsFunction] = useState<TagsState>({
    alcoholTags: [1],
    musicTags: [1],
    moodTags: [1],
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
    // 이미지 파일이 선택되었을 경우, formData에 추가
    if (reviewImg) {
      formData.append("reviewImg", reviewImg);
    }

    const reviewData = JSON.stringify({
      nickname: nickName,
      reviewPw: reviewPw,
      score: score,
      content: content,
      ...tags,
    });

    formData.append(
      "barReviewDTO",
      new Blob([reviewData], { type: "application/json" })
    );

    try {
      console.log(reviewData, "리뷰데타");
      console.log(formData, "폼데타");
      const response = await axios.post(`/api/ohsul/${barId}/review`, formData);
      console.log("Review submission response:", response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Review submission error: ", error.message);
        if (error.response) {
          console.error("Response data: ", error.response.data);
          console.error("Status code: ", error.response.status);
        }
      } else {
        console.error("An error occurred: ", error);
      }
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
              type="text"
              // @ts-ignore
              value={userNickname}
              placeholder="리뷰 작성 시 사용할 닉네임을 입력해주세요."
              readOnly={true}
              style={{ outline: "none", backgroundColor: "#ddd" }}
            />
          </S.InputBox>
          <S.InputBox>
            <S.ExplainInput>비밀번호</S.ExplainInput>
            <S.StyledInput
              type="password"
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
      {/* <TagBox checkedTags={tags} /> */}
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
          type="textarea"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
          placeholder="85자 이내 작성"
        />
      </S.ContentWrapper>
      <S.Button onClick={postReview}>리뷰 작성하기</S.Button>
    </>
  );
};

export default BarAddReviewPage;
