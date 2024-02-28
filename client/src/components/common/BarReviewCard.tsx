import React from "react";
import styled from "styled-components";
import axios from "axios";
import { CardBarReview } from "../../types/Common";
import { Link, useNavigate } from "react-router-dom";
import {
  useAlcoholTags,
  useMoodTags,
  useMusicTags,
} from "../../hooks/tagsChange";
import useAuthStore from "../../stores/useAuthStore";

const BarReviewCard: React.FC<CardBarReview> = ({
  nickname,
  score,
  reviewImg,
  tag,
  content,
  date,
  barId,
  reviewId,
  alcoholTags,
  moodTags,
  musicTags,
}) => {
  const { userNickname } = useAuthStore.getState();
  const { userId } = useAuthStore.getState();
  console.log(userNickname);
  const navigate = useNavigate();
  const getAlcoholTagName = useAlcoholTags();
  const getMusicTagName = useMusicTags();
  const getMoodTagName = useMoodTags();
  const etxText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const reviewPatch = async () => {
    try {
      // 리뷰 비밀번호 확인 요청
      // const res = await axios.post("/api/");
      // console.log("review patch res", res);
      // if (res.status == 200) {
      //   console.log("비밀번호 일치");
      //   // 일치 시 해당 수정 페이지로 이동
      //   navigate("/");
      // } else {
      //   console.log("비밀번호가 일치하지 않습니다.");
      // }
      navigate(`/ohsul/${barId}/editReview/${reviewId}`);
    } catch (error) {
      console.log("review patch err", error);
    }
  };

  const reviewDelete = async () => {
    console.log(barId);
    console.log(reviewId);
    try {
      const res = await axios.delete(`/api/ohsul/${barId}/review/${reviewId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("review delete res", res);
      if (res.status === 200) {
        console.log("삭제 성공");
      } else {
        console.log("삭제 실패:", res.data);
      }
    } catch (error) {
      console.error("리뷰 삭제 중 에러:", error);
    }
  };

  return (
    <>
      <CardLayout>
        <ContentBox1>
          <UserBox>
            <UserImg>
              <img src="/assets/images/common_userIcon.png" alt="UserImg" />
            </UserImg>
            <UserNickname>{nickname}</UserNickname>
          </UserBox>
          <ScoreBox>
            <ScoreImg>
              <img src="/assets/images/common_star.png" alt="Score" />
            </ScoreImg>
            <ScoreText>{score}</ScoreText>
          </ScoreBox>
        </ContentBox1>

        <ContentBox2>
          <Link to={`/ohsul/bar/${barId}`}>
            <ImgBox>
              <img
                src={
                  reviewImg
                    ? process.env.PUBLIC_URL + reviewImg
                    : process.env.PUBLIC_URL +
                      "/assets/images/common_alternateImage.png"
                }
                alt="리뷰이미지"
              />
            </ImgBox>
          </Link>
          <TagLayout>
            {alcoholTags?.length === 0 ? (
              <TagBox>
                <TagTitle>술</TagTitle>
                <TagContent>아직 태그가 없어요</TagContent>
              </TagBox>
            ) : (
              <TagBox>
                <TagTitle>술</TagTitle>
                {alcoholTags?.slice(0, 2).map((item, index) => (
                  <TagContent key={index}>{getAlcoholTagName(item)}</TagContent>
                ))}
              </TagBox>
            )}

            {moodTags?.length === 0 ? (
              <TagBox>
                <TagTitle>분위기</TagTitle>
                <TagContent>아직 태그가 없어요</TagContent>
              </TagBox>
            ) : (
              <TagBox>
                <TagTitle>분위기</TagTitle>
                {moodTags?.slice(0, 2).map((item, index) => (
                  <TagContent key={index}>{getMoodTagName(item)}</TagContent>
                ))}
              </TagBox>
            )}

            {musicTags?.length === 0 ? (
              <TagBox>
                <TagTitle>음악</TagTitle>
                <TagContent>아직 태그가 없어요</TagContent>
              </TagBox>
            ) : (
              <TagBox>
                <TagTitle>음악</TagTitle>
                {musicTags?.slice(0, 2).map((item, index) => (
                  <TagContent key={index}>{getMusicTagName(item)}</TagContent>
                ))}
              </TagBox>
            )}
          </TagLayout>
        </ContentBox2>

        <ContentBox3>
          <ReviewBox>{content ? etxText(content, 85) : ""}</ReviewBox>
        </ContentBox3>

        <ContentBox4>
          <DateBox>{date}</DateBox>
          {userNickname === nickname && (
            <BtnBox>
              <EditBtn
                onClick={() => {
                  console.log("리뷰 수정 클릭");
                  reviewPatch();
                }}
              >
                <img src="/assets/images/common_edit.png" alt="리뷰 수정하기" />
              </EditBtn>
              <DelBtn
                onClick={() => {
                  console.log("리뷰 삭제 클릭");
                  reviewDelete();
                }}
              >
                <img src="/assets/images/common_del.png" alt="리뷰 삭제하기" />
              </DelBtn>
            </BtnBox>
          )}
        </ContentBox4>
      </CardLayout>
    </>
  );
};

export default BarReviewCard;

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 15px;
  gap: 3px;

  width: 100%;
  height: 201px;

  background: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid #4d607b;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: 14px;
  margin: 5px 0 5px 0;
`;

const ContentBox1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px 10px;
  gap: 3px;

  /* width: 346px; */
  width: 100%;
  height: 26px;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 3px;

  width: 152px;
  height: 24px;
`;

const UserImg = styled.div`
  img {
    width: 15px;
    height: 14px;
    object-fit: contain;
  }
`;

const UserNickname = styled.div`
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-size: 14px;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: 35px;
  height: 15px;
`;

const ScoreImg = styled.div`
  img {
    width: 16px;
    height: 15px;
    object-fit: contain;
  }
`;

const ScoreText = styled.div`
  width: 12px;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

const ContentBox2 = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  padding: 2px 10px 2px 5px;
  gap: 15px;

  /* width: 341px; */
  width: 100%;
  height: 84px;
`;

const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TagLayout = styled.div`
  width: auto;
  height: 71px;
`;

const TagBasic = `
height: 20px;
font-size: 11px;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
margin: 2px 1px;
`;

const TagTitle = styled.div`
  color: ${({ theme }) => theme.colors.mainBlue};
  background: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px dashed ${({ theme }) => theme.colors.mainBlue};
  width: 40px;
  ${TagBasic}
`;

const TagBox = styled.div`
  display: flex;
  gap: 2px;
`;

const TagContent = styled.div`
  color: ${({ theme }) => theme.colors.bgColor};
  background: ${({ theme }) => theme.colors.mainBlue};
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  width: auto;
  padding: 7px;
  margin: 4px;
  ${TagBasic}
`;

const ContentBox3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 7px;
  gap: 10px;
  /* width: 348px; */
  width: 100%;
  height: 24px;
`;

const ReviewBox = styled.div`
  width: 100%;
  height: 24px;
  /* left: 6px;
  top: 22.5px; */
  /* position: absolute; */
  line-height: 12px;
  text-align: left;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.0125em;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const ContentBox4 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 5px;
  gap: 10px;
  width: 100%;
  height: 20px;
`;

const DateBox = styled.div`
  width: 70px;
  height: 15px;
  font-family: "Yeongdeok Sea";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 34px;
  height: 16px;
`;

const EditBtn = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const DelBtn = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
