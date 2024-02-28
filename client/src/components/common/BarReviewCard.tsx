import React from "react";
import styled from "styled-components";
import axios from "axios";
import { CardBarReview } from "../../types/Common";
import { useNavigate } from "react-router-dom";

const BarReviewCard: React.FC<CardBarReview> = ({
  userNickname,
  score,
  reviewImg,
  tag,
  content,
  date,
  barId,
  reviewId,
}) => {
  const tagData = tag || { drink: [], mood: [], music: [] };
  const drink: number[] = tagData.drink;
  const mood: number[] = tagData.mood;
  const music: number[] = tagData.music;
  const navigate = useNavigate();

  console.log(drink);

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
    try {
      // 삭제 요청
      const res = await axios.delete(`/api/ohsul/${barId}/review/${reviewId}`);
      console.log("review delete res", res);
      if (res.status == 200) {
        // 응답 성공 시
        console.log("삭제 성공");
      } else {
        // 비밀번호 들어오나 ?
        console.log("비밀번호 에러");
      }
    } catch (error) {
      console.log("review delete err", error);
    }
  };

  return (
    <>
      <CardLayout>
        <ContentBox1>
          <UserBox>
            <UserImg>
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/common_userIcon.png"
                }
                alt="UserImg"
              />
            </UserImg>
            <UserNickname>{userNickname}</UserNickname>
          </UserBox>
          <ScoreBox>
            <ScoreImg>
              <img
                src={process.env.PUBLIC_URL + "assets/images/common_star.png"}
                alt="Score"
              />
            </ScoreImg>
            <ScoreText>{score}</ScoreText>
          </ScoreBox>
        </ContentBox1>

        <ContentBox2>
          <ImgBox>
            <img
              src={
                reviewImg
                  ? process.env.PUBLIC_URL + reviewImg
                  : process.env.PUBLIC_URL +
                    "assets/images/common_alternateImage.png"
              }
              alt="리뷰이미지"
            />
          </ImgBox>
          <TagLayout>
            <TagBox>
              <TagTitle>술</TagTitle>
              {drink.map((item, index) => (
                <TagContent key={index}>{item}</TagContent>
              ))}
            </TagBox>
            <TagBox>
              <TagTitle>분위기</TagTitle>
              {mood.map((item, index) => (
                <TagContent key={index}>{item}</TagContent>
              ))}
            </TagBox>
            <TagBox>
              <TagTitle>음악</TagTitle>
              {music.map((item, index) => (
                <TagContent key={index}>{item}</TagContent>
              ))}
            </TagBox>
          </TagLayout>
        </ContentBox2>

        <ContentBox3>
          <ReviewBox>{content ? etxText(content, 85) : ""}</ReviewBox>
        </ContentBox3>

        <ContentBox4>
          <DateBox>{date}</DateBox>
          <BtnBox>
            <EditBtn
              onClick={() => {
                console.log("리뷰 수정 클릭");
                reviewPatch();
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "assets/images/common_edit.png"}
                alt="리뷰 수정하기"
              />
            </EditBtn>
            <DelBtn
              onClick={() => {
                console.log("리뷰 삭제 클릭");
                reviewDelete();
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "assets/images/common_del.png"}
                alt="리뷰 삭제하기"
              />
            </DelBtn>
          </BtnBox>
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

  /* width: 382px; */
  width: 100%;
  height: 201px;
  /* height: auto; */

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
  font-size: 13px;
`;
const ScoreBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
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
  width: 17px;
  height: 15px;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
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
  width: 70px;
  height: 72px;
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
font-size: 12px;
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
  width: 46px;
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
  height: 35px;
`;

const ReviewBox = styled.div`
  width: 341px;
  height: 24px;
  /* left: 6px;
  top: 22.5px; */
  position: absolute;
  font-size: 10px;
  line-height: 12px;

  text-align: left;
  font-size: 10px;
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

  /* width: 346px; */
  width: 100%;
  height: 20px;
`;

const DateBox = styled.div`
  width: 70px;
  height: 15px;
  /* position: absolute; */

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
  /* position: absolute; */
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
  /* position: absolute; */
  width: 16px;
  height: 16px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
