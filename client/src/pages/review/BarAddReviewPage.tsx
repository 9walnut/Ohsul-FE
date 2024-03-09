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
import { useNavigate } from "react-router-dom";
import OnlyMember from "../../components/common/OnlyMember";

const BarAddReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const selectImg = useRef<HTMLInputElement>(null);
  const { barId } = useParams();
  const { userNickname } = useAuthStore.getState();
  const [nickName, setNickName] = useState(userNickname);
  const [reviewPw, setReviewPw] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [score, setScore] = useState(1);
  const [content, setContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  const [tags, setTags]: [TagsState, SetTagsFunction] = useState<TagsState>({
    alcoholTags: [1],
    musicTags: [1],
    moodTags: [1],
  });

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // @ts-ignore
      setPostImg(file);
      // FileReader 객체를 사용해 파일을 읽습니다.
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

  const checkReview = () => {
    if (tags.alcoholTags.length <= 0) {
      setAlertMsg("📢 술 태그를 1개 이상 선택해주세요 !");
    } else if (tags.alcoholTags.length > 3) {
      setAlertMsg("📢 술 태그를 3개 이하로 선택해주세요 !");
    } else if (tags.moodTags.length <= 0) {
      setAlertMsg("📢 분위기 태그를 1개 이상 선택해주세요 !");
    } else if (tags.moodTags.length > 3) {
      setAlertMsg("📢 분위기 태그를 3개 이하로 선택해주세요 !");
    } else if (tags.musicTags.length <= 0) {
      setAlertMsg("📢 음악 태그를 1개 이상 선택해주세요 !");
    } else if (tags.musicTags.length > 3) {
      setAlertMsg("📢 음악 태그를 3개 이하로 선택해주세요 !");
    } else {
      setAlertMsg("");
      postReview();
    }
  };

  const postReview = async () => {
    const formData = new FormData();
    // 이미지 파일이 선택되었을 경우, formData에 추가
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
      console.log(reviewData, "리뷰데타");
      console.log(formData, "폼데타");
      const res = await axios.post(`/api/ohsul/${barId}/review`, formData);
      console.log("Review submission response:", res);
      if (res.status == 200) {
        navigate("/mypage");
      }
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
      {isLoggedIn ? (
        <>
          <S.ReviewPageLayout>
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
                <S.ImgUploadBtn
                  onClick={() => selectImg.current?.click()}
                  style={{ backgroundColor: "none" }}
                >
                  업로드
                </S.ImgUploadBtn>
              ) : (
                <S.ImgUploadBtn onClick={() => selectImg.current?.click()}>
                  업로드
                </S.ImgUploadBtn>
              )}
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
            <S.AlertBox>{alertMsg}</S.AlertBox>
            <S.Button onClick={checkReview}>리뷰 작성하기</S.Button>
          </S.ReviewPageLayout>
        </>
      ) : (
        <>
          <OnlyMember></OnlyMember>
        </>
      )}
    </>
  );
};
export default BarAddReviewPage;
