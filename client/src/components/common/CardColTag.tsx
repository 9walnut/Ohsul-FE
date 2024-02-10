import React from "react";
import styled from "styled-components";

import { CardTag } from "../../types/Common";

const CardCol: React.FC<CardTag> = ({ barName, barImg, score, tag }) => {
  return (
    <>
      <CardLayout>
        <LeftContent>
          <TitleBox>{barName}</TitleBox>
          <ImgBox>
            <img
              src={
                barImg
                  ? process.env.PUBLIC_URL + barImg
                  : process.env.PUBLIC_URL +
                    "assets/images/common_alternateImage.png"
              }
              alt={barName}
            />
          </ImgBox>
          <ScoreBox>
            <ScoreImg>
              <img
                src={process.env.PUBLIC_URL + "assets/images/common_star.png"}
                alt="Score"
              />
            </ScoreImg>
            <ScoreText>99{score}</ScoreText>
          </ScoreBox>
        </LeftContent>
        <RightContent>
          <FavoriteBox>
            <FavoriteImg>
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/common_favorite.png"
                }
                alt="Score"
              />
            </FavoriteImg>
          </FavoriteBox>
          <TagLayout>여기 태그</TagLayout>
        </RightContent>
      </CardLayout>
    </>
  );
};

export default CardCol;

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 5px;

  /* width: 382px; */
  width: 100%;
  height: 163px;

  background: #fcfaf9;
  border: 1px solid #4d607b;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: 14px;

  margin: 5px 0 5px 0;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px 5px;
  gap: 3px;

  width: 162px;
  height: 149px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 3px;

  width: 152px;
  height: 24px;

  font-family: "Yeongdeok Sea";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  flex: none;
`;

const ImgBox = styled.div`
  width: 93px;
  height: 96px;
  overflow: hidden;
  border-radius: 12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px 5px;
  gap: 20px;

  width: 162px;
  height: 149px;
`;

const FavoriteBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 3px;

  width: 152px;
  height: 24px;
`;
const FavoriteImg = styled.div`
  img {
    width: 16px;
    height: 22px;
    object-fit: contain;
  }
`;

const TagLayout = styled.div`
  width: 151px;
  height: 71px;

  background-color: gainsboro;
`;
