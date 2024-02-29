import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Card } from "../../types/Common";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
interface Bar {
  barId: number;
  barName: string;
  barImg: string;
  alcoholTags: Array<number>;
  musicTags: Array<number>;
  moodTags: Array<number>;
  barAvgScore: number;
}

interface BarData {
  bar: Bar;
}

const CardRow: React.FC<BarData> = ({ bar }) => {
  const [isTag, setIsTag] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("들어온데이터", bar);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonCard />;
  }

  const scoreCheck = (score: any) => {
    if (score == "NaN") {
      return 0;
    } else {
      return score.toFixed(1);
    }
  };

  return (
    <>
      <CardLayout>
        <Link
          to={`/ohsul/bar/${bar.barId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <BarImgBox>
            {bar.barImg ? (
              <img src={bar.barImg} />
            ) : (
              <img src="/assets/images/common_alternateImage.png" />
            )}
          </BarImgBox>
          <BarWrapper>
            <BarTitleBox>{bar.barName}</BarTitleBox>
            {/* @ts-ignore */}
            {bar.barRecentReviews ? (
              <BarReviewBox>
                <div id="recentReview">
                  최신 리뷰 <img src="/assets/images/arrow-down.png" />
                </div>
                {/* @ts-ignore */}
                <div id="reviewContent">{bar.barRecentReviews[0].content}</div>
              </BarReviewBox>
            ) : (
              <BarReviewBox>
                현재 작성된 리뷰가 없어요
                <br />
                방문 후 리뷰를 작성해주세요.
              </BarReviewBox>
            )}

            <ScoreBox>
              <img src={"/assets/images/star.png"} alt="Score" />
              {bar.barAvgScore ? (
                <div>{scoreCheck(bar.barAvgScore)}</div>
              ) : (
                <div>리뷰를 작성해주세요</div>
              )}
            </ScoreBox>
          </BarWrapper>
        </Link>
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
    border-radius: 14px;
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
  color: #808080;
  #recentReview {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkFont};
    margin-bottom: 4px;
    display: flex;
    img {
      margin-left: 4px;
      height: 10px;
    }
  }
  #reviewContent {
    margin-bottom: 4px;
  }
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-size: 12px;
`;

const TagBox = styled.div``;

const BarWrapper = styled.div``;

// 애니메이션 정의
const loadingAnimation = keyframes`
0% {
  background-position: -200px 0;
}
100% {
  background-position: 200px 0;
}
`;

const Skeleton = styled.div`
  width: 130px;
  height: 130px;
  background: linear-gradient(to right, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.3s infinite linear;
  border-radius: 14px;
`;

const SkeletonTitle = styled.div`
  width: 130px;
  height: 18px;
  margin: 6px 0px;
  background: linear-gradient(to right, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.3s infinite linear;
  border-radius: 14px;
`;

const SkeletonReview = styled.div`
  width: 130px;
  height: 50px;
  background: linear-gradient(to right, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.3s infinite linear;
  border-radius: 14px;
`;

// 스켈레톤 UI 스타일 컴포넌트
const SkeletonCard = () => (
  <CardLayout>
    <Skeleton />
    <SkeletonTitle />
    <SkeletonReview />
  </CardLayout>
);

export default CardRow;
