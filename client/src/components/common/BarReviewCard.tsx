import React from "react";
import styled from "styled-components";

import { CardBarReview } from "../../types/Common";

const BarReviewCard: React.FC<CardBarReview> = ({
  userNickname,
  score,
  barImg,
  tag,
  content,
  date,
}) => {
  const etxText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
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
                barImg
                  ? process.env.PUBLIC_URL + barImg
                  : process.env.PUBLIC_URL +
                    "assets/images/common_alternateImage.png"
              }
              alt="리뷰이미지"
            />
          </ImgBox>
          <TagLayout>여기 태그</TagLayout>
        </ContentBox2>

        <ContentBox3>
          <ReviewBox>{content ? etxText(content, 85) : ""}</ReviewBox>
        </ContentBox3>

        <ContentBox4>
          <DateBox>{date}</DateBox>
          <BtnBox>
            <EditBtn onClick={() => console.log("리뷰 수정 클릭")}>
              <img
                src={process.env.PUBLIC_URL + "assets/images/common_edit.png"}
                alt="리뷰 수정하기"
              />
            </EditBtn>
            <DelBtn onClick={() => console.log("리뷰 삭제 클릭")}>
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

  background: #fcfaf9;
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
  font-family: "Yeongdeok Sea";
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

  font-family: "Yeongdeok Sea";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
`;

const ContentBox2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px 10px 2px 5px;
  gap: 3px;

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
  width: 151px;
  height: 71px;

  background-color: gainsboro;
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
  color: #7588a3;
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
