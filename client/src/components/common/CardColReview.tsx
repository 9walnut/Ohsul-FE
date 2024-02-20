import React from "react";
import styled from "styled-components";

import { CardReview } from "../../types/Common";

const CardColReview: React.FC<CardReview> = ({
  barName,
  barImg,
  score,
  content,
}) => {
  return (
    <>
      <CardLayout>
        <TopBox>
          <TitleBox>{barName}</TitleBox>
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
        </TopBox>

        <ContentLayout>
          <LeftContent>
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
            <ContentWrapper>
              <ReviewBox>
                이러코저러코 리뷰리뷰리뷰리뷰리뷰 리뷰리뷰리뷰리뷰
                리뷰리뷰리리뷰가 들어와여 리뷰리뷰리뷰리뷰 리리뷰리뷰 리뷰리뷰
              </ReviewBox>
              <Button> GO </Button>
            </ContentWrapper>
          </RightContent>
        </ContentLayout>
      </CardLayout>
    </>
  );
};

export default CardColReview;

const BasicStyle = `
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 5px;

  /* width: 382px; */
  width: 100%;
  height: 163px;

  background: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid ${({ theme }) => theme.colors.blueFont};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: 14px;

  margin: 5px 0 5px 0;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 5px;

  /* width: 329px; */
  width: 100%;
  height: 24px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 5px;
  gap: 3px;

  margin: 0 15px;
  width: 161px;
  height: 24px;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  flex: none;
`;

const FavoriteBox = styled.div`
  ${BasicStyle}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  gap: 3px;

  margin: 0 17px;
  width: 26px;
  height: 24px;
`;
const FavoriteImg = styled.div`
  img {
    width: 16px;
    height: 22px;
    object-fit: contain;
  }
`;

const ContentLayout = styled.div`
  ${BasicStyle}
  padding: 0px;
  gap: 10px;

  width: 355px;
  height: 120px;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px 5px;
  gap: 3px;

  width: 103px;
  height: 120px;
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

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px;
  gap: 10px;

  width: 222px;
  height: 120px;
`;

const ContentWrapper = styled.div`
  ${BasicStyle}
  padding: 5px;
  gap: 10px;
  isolation: isolate;
  margin: 0 auto;
  width: 222px;
  height: 95px;
`;

const ReviewBox = styled.div`
  width: 153.5px;
  height: 50px;
  left: 6px;
  top: 22.5px;

  text-align: left;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.0125em;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const Button = styled.button`
  ${BasicStyle}
  width: 45px;
  height: 25px;
  left: 166.5px;
  top: 35px;

  background: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.0125em;
  color: #ffffff;
`;
