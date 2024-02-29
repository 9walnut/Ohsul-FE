import React, { useEffect, useState } from "react";
import { useRef } from "react";
import * as S from "./BarPageStyle";
import Header from "../../components/common/Header";
import StarRating from "../../components/common/StarRating";
import BackButton from "../../components/common/BackButton";
import TagBox from "../../components/ohsulTag/TagBox";
import axios from "axios";
import { useParams } from "react-router";
import useAuthStore from "../../stores/useAuthStore";
import { TagsState, SetTagsFunction } from "../../types/OhsulTag";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const selectImg = useRef<HTMLInputElement>(null);
  const { userNickname } = useAuthStore.getState();
  const [nickName, setNickName] = useState(userNickname);
  const [reviewPw, setReviewPw] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [score, setScore] = useState(1);
  const [content, setContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);
  const [postImg, setPostImg] = useState(null);

  const [tags, setTags]: [TagsState, SetTagsFunction] = useState<TagsState>({
    alcoholTags: [1],
    musicTags: [1],
    moodTags: [1],
  });

  const { barId, reviewId } = useParams();

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      //@ts-ignore
      setPostImg(file);

      const reader = new FileReader();

      reader.onload = (loadEvent) => {
        //@ts-ignore
        const imgData = loadEvent.target.result;
        //@ts-ignore
        setReviewImg(imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getReview();
  }, [reviewId]);

  // 리뷰 가져오기
  const getReview = async () => {
    try {
      const res = await axios.get(`/api/ohsul/${barId}/review/${reviewId}`);
      console.log("getReview res", res.data);
      setTags({
        alcoholTags: res.data.alcoholTags,
        musicTags: res.data.musicTags,
        moodTags: res.data.moodTags,
      });
      setReviewImg(res.data.reviewImg);
      setScore(res.data.score);
      setContent(res.data.content);
    } catch (error) {
      console.log("getReview err", error);
    }
  };

  // 리뷰 수정하기
  const patchReview = async () => {
    const formData = new FormData();
    if (postImg) {
      console.log(postImg, "이미지 들어왔");
      formData.append("reviewImg", postImg);
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
      const res = await axios.patch(
        `/api/ohsul/${barId}/review/${reviewId}`,
        formData
      );
      if (res.status == 200) {
        console.log("수정 완료 ~");
        console.log("review patch", res);
        navigate("/mypage");
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
                type="text"
                // @ts-ignore
                value={userNickname}
                placeholder="리뷰 작성 시 사용할 닉네임을 입력해주세요."
                readOnly={true}
                style={{ outline: "none", backgroundColor: "#ddd" }}
              />
            </S.InputBox>
            {/* <S.InputBox>
              <S.ExplainInput>비밀번호</S.ExplainInput>
              <S.StyledInput
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setReviewPw(e.target.value);
                }}
                placeholder="비밀번호를 입력해주세요."
              />
            </S.InputBox> */}
          </S.InputBoxWrapper>
        )}

        <S.ExplainBox>
          태그는 각 최소 1개씩 필수입니다 ! (각 최대 3개)
        </S.ExplainBox>

        <TagBox tags={tags} setTags={setTags} />

        <S.ExplainBox>별점은 필수 선택입니다 !</S.ExplainBox>
        <S.StarWrapper>
          <StarRating ratingIndex={score} setRatingIndex={setScore} />
        </S.StarWrapper>

        <S.ImgUploadWrapper>
          <S.ImgBox>
            {reviewImg ? (
              // 상태에 저장된 이미지 데이터 URL을 사용하여 미리보기 이미지를 표시합니다.
              <img
                src={reviewImg}
                alt="Review"
                // style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <img
                src="/assets/images/common_AlternateImage.png"
                alt="Placeholder"
              />
            )}
          </S.ImgBox>

          <input
            type="file"
            onChange={onChangeImg}
            accept=".png, .jpeg, .jpg"
            ref={selectImg}
            style={{ display: "none" }}
          />
          {reviewImg ? (
            <S.ImgUploadBtn onClick={() => selectImg.current?.click()}>
              업로드
            </S.ImgUploadBtn>
          ) : (
            <S.ImgUploadBtn
              onClick={() => selectImg.current?.click()}
              style={{ color: "black" }}
            >
              업로드
            </S.ImgUploadBtn>
          )}
        </S.ImgUploadWrapper>
        <S.ContentWrapper>
          <S.ContentBox
            value={content}
            type="textarea"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
            placeholder="85자 이내 작성"
          />
        </S.ContentWrapper>
        <S.Button onClick={patchReview}>리뷰 수정</S.Button>
      </S.ReviewPageLayout>
    </>
  );
};

export default BarEditReviewPage;
