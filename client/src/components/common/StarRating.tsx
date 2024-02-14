import React from "react";
import styled from "styled-components";
import { StarRatingProps } from "../../types/Common";

const StarRating: React.FC<StarRatingProps> = ({ score }) => {
  return (
    <>
      <RatingLayout>
        <img src="/assets/images/star.png" alt="star" />
        {/* 받아오는 데이터가 생길 시 아래 코드로 변경 */}
        {/* <ScoreBox>{score}</ScoreBox> */}
        <ScoreBox>4</ScoreBox>
      </RatingLayout>
    </>
  );
};

export default StarRating;

const RatingLayout = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreBox = styled.div`
  font-size: 12px;
  font-family: YeongdeokSea;
`;
