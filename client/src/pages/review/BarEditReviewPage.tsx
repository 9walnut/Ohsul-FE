import React, { useEffect, useState } from "react";
import { useRef } from "react";
import * as S from "./BarPageStyle";
import Header from "../../components/common/Header";
import StarRating from "../../components/common/StarRating";
import BackButton from "../../components/common/BackButton";
import TagBox from "../../components/ohsulTag/TagBox";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const DUMMYTags = {
  alcohol: ["alcohol_1", "alcohol_2", "alcohol_5"],
  music: ["music_3", "music_5"],
  mood: ["mood_1", "mood_3"],
  etc: ["etc_1"],
  snack: ["snack_2"],
};

interface ReviewDataTypes {
  reviewImg?: string | undefined;
  content?: string;
}

const BarEditReviewPage = () => {
  const selectImg = useRef<HTMLInputElement>(null);
  const { userNickname } = useAuthStore.getState();
  const [reviewPw, setReviewPw] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [score, setScore] = useState(1);
  const [content, setContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);
  const [reviewData, setReviewData] = useState<ReviewDataTypes>({});

  const [tags2, setTags2] = useState({
    alcoholTags: [1],
    musicTags: [1],
    moodTags: [1],
  });

  const { barId, reviewId } = useParams();

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const img = e.target.files[0];
      //@ts-ignore
      setReviewImg(img);
    }
  };

  useEffect(() => {
    getReview();
  }, [reviewId]);

  const getReview = async () => {
    try {
      const res = await axios.get(`/api/ohsul/${barId}/review/${reviewId}`);
      console.log("getReview res", res.data);
      setReviewData(res.data);
    } catch (error) {
      console.log("getReview err", error);
    }
  };

  const patchReview = async () => {
    const formData = new FormData();
    if (reviewImg) {
      formData.append("reviewImg", reviewImg);
    }

    const reviewData = JSON.stringify({
      nickname: userNickname,
      reviewPw: reviewPw,
      score: score,
      content: content,
      userId: "qwer1234",
      ...tags2,
    });

    formData.append(
      "barReviewDTO",
      new Blob([reviewData], { type: "application/json" })
    );
    try {
      const res = await axios.patch(
        `/api/ohsul/${barId}/review/${reviewId}`,
        formData
      );
      if (res.status == 200) {
        console.log("수정 완료 ~");
      }
    } catch (error) {
      console.log("patchReview err", error);
    }
  };

  return (
    <>
      <S.ReviewPageLayout>
        <Header title="리뷰 수정" />
        <BackButton />
        {isLogin && (
          <S.InputBoxWrapper>
            <S.InputBox>
              <S.ExplainInput>닉네임</S.ExplainInput>
              <S.StyledInput
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
        {/* <TagBox checkedTags={DUMMYTags} disabled={true} /> */}
        <S.ExplainBox>별점은 필수 선택입니다 !</S.ExplainBox>
        {/* @ts-ignore */}
        <StarRating ratingIndex={reviewData.score} setRatingIndex={setScore} />

        <S.ImgUploadWrapper>
          <S.ImgBox>
            {reviewData.reviewImg ? (
              <img src={reviewData.reviewImg} />
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
            value={reviewData.content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
          />
        </S.ContentWrapper>
        <S.Button onClick={patchReview}>리뷰 수정 하기</S.Button>
      </S.ReviewPageLayout>
    </>
  );
};

export default BarEditReviewPage;
