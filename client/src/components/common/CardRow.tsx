import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "../../types/Common";
import StarRating from "./StarRating";

const CardRow: React.FC<Card> = ({ barName, barImg, score, tag, content }) => {
  const [isTag, setIsTag] = useState(false);
  const [isContent, setIsContent] = useState(false);
  return (
    <>
      <CardLayout>
        <BarImgBox>
          <img src="/assets/images/common_alternateImage.png" />
        </BarImgBox>
        <BarWrapper>
          <BarTitleBox>{barName}</BarTitleBox>
          {isTag ? (
            <TagBox>태그 ㅋ</TagBox>
          ) : isContent ? (
            <BarReviewBox>
              리뷰ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
            </BarReviewBox>
          ) : (
            <BarReviewBox>
              현재 작성된 리뷰가 없어요
              <br />
              방문 후 리뷰를 작성해주세요.
            </BarReviewBox>
          )}

          <ScoreBox>
            <img
              src={process.env.PUBLIC_URL + "assets/images/star.png"}
              alt="Score"
            />
            <div>9{score}</div>
          </ScoreBox>
        </BarWrapper>
      </CardLayout>
    </>
  );
};

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
  height: 200px;
  border: none;
  border-radius: 14px;
  text-align: left;
`;

const BarImgBox = styled.div`
  width: 100%;
  img {
    /* object-fit: contain; */
    width: 100%;
    height: 130px;
  }
`;

const BarTitleBox = styled.div`
  font-weight: 600;
  margin: 8px 0px;
`;

const BarReviewBox = styled.div`
  font-size: 12px;
  opacity: 50%;
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-size: 14px;
`;

const TagBox = styled.div``;

const BarWrapper = styled.div``;

export default CardRow;
