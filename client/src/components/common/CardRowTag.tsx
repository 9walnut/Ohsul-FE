import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Card } from "../../types/Common";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import {
  useAlcoholTags,
  useMoodTags,
  useMusicTags,
} from "../../hooks/tagsChange";

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

const CardRowTag: React.FC<BarData> = ({ bar }) => {
  const [isTag, setIsTag] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAlcoholTagName = useAlcoholTags();
  const getMusicTagName = useMusicTags();
  const getMoodTagName = useMoodTags();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scoreCheck = (score: any) => {
    if (score == "NaN") {
      return 0;
    } else {
      return score.toFixed(1);
    }
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

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
            <TagLayout>
              {bar.alcoholTags?.length === 0 ? (
                <TagBox>
                  <TagTitle>술</TagTitle>
                  <TagContent>아직 태그가 없어요</TagContent>
                </TagBox>
              ) : (
                <TagBox>
                  <TagTitle>술</TagTitle>
                  {bar.alcoholTags?.slice(0, 2).map((item, index) => (
                    <TagContent key={index}>
                      {getAlcoholTagName(item)}
                    </TagContent>
                  ))}
                </TagBox>
              )}

              {bar.moodTags?.length === 0 ? (
                <TagBox>
                  <TagTitle>분위기</TagTitle>
                  <TagContent>아직 태그가 없어요</TagContent>
                </TagBox>
              ) : (
                <TagBox>
                  <TagTitle>분위기</TagTitle>
                  {bar.moodTags?.slice(0, 2).map((item, index) => (
                    <TagContent key={index}>{getMoodTagName(item)}</TagContent>
                  ))}
                </TagBox>
              )}

              {bar.musicTags?.length === 0 ? (
                <TagBox>
                  <TagTitle>음악</TagTitle>
                  <TagContent>아직 태그가 없어요</TagContent>
                </TagBox>
              ) : (
                <TagBox>
                  <TagTitle>음악</TagTitle>
                  {bar.musicTags?.slice(0, 2).map((item, index) => (
                    <TagContent key={index}>{getMusicTagName(item)}</TagContent>
                  ))}
                </TagBox>
              )}
            </TagLayout>
            <ScoreBox>
              <div>
                <img
                  src={process.env.PUBLIC_URL + "assets/images/star.png"}
                  alt="Score"
                />
              </div>
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
  height: 220px;
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
  opacity: 50%;
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-size: 12px;
`;

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

const SkeletonTags = styled.div`
  width: 130px;
  height: 20px;
  margin-top: 6px;
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
    <SkeletonTags />
    <SkeletonTags />
    <SkeletonTags />
  </CardLayout>
);

const TagLayout = styled.div`
  width: auto;
  height: 71px;
`;

const TagBasic = `
height: 20px;
font-size: 8px;
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
  width: 32px;
  ${TagBasic}
  font-size: 10px;
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

export default CardRowTag;
