import React from "react";
import styled from "styled-components";

import { Card } from "../../types/Common";
import StarRating from "./StarRating";

// ✅삼항연산자로 태그 잇냐없냐에 따라 레이아웃 다르게?

const CardCol: React.FC<Card> = ({ barName, barImg, score, tag }) => {
  return (
    <>
      <CardLayout>
        <BasicBox>
          <TitleBox>{barName}</TitleBox>
          <ImgBox>
            {/* <img src={process.env.PUBLIC_URL + barImg} alt={barName} /> */}
          </ImgBox>
          {/* @ts-ignore */}
          {/* <StarRating score={score} /> */}
          {/* <div>{tag}</div> */}
        </BasicBox>
      </CardLayout>
    </>
  );
};

export default CardCol;

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  gap: 20px;
  /* width: 382px; */
  width: 100%;
  height: 163px;
  background: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid ${({ theme }) => theme.colors.blueFont};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: 14px;
  margin: 5px 0 5px 0;
`;

const BasicBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px 10px;
  gap: 3px;
  width: 172px;
  height: 149px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 3px;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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
