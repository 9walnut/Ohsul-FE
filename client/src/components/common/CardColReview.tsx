import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FavoriteBar } from "../../types/Common";
import useAuthStore from "../../stores/useAuthStore";
import axios from "axios";

const CardColReview: React.FC<FavoriteBar> = ({
  barId,
  barPhone,
  barName,
  barImg,
  score,
  content,
  onFavoriteChange,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteBarId, setFavoriteBarId] = useState<number[]>([]);
  const [imageError, setImageError] = useState(false);

  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  useEffect(() => {
    fetchFavorite();
  }, []);

  useEffect(() => {
    if (barId) {
      setIsFavorite(favoriteBarId.includes(barId));
    }
  }, [favoriteBarId, barId]);

  const fetchFavorite = async () => {
    try {
      const res = await axios.get("/api/favorite/favoriteList");
      if (res.status == 200) {
        setFavoriteBarId(res.data);
        console.log("favoriteList res.data : ", res.data);
      }
    } catch (error) {
      console.log("fetch Favorite err: ", error);
    }
  };

  //---favorite add delete
  const handleFavorite = async () => {
    console.log("favorite click");
    const favoriteData = {
      barId: barId,
    };
    console.log(favoriteData);
    try {
      if (isFavorite) {
        const res = await axios.delete("/api/favorite/delete", {
          data: {
            barId: barId,
          },
        });
        if (res.status == 200) {
          console.log("delete res: ", res);
          if (onFavoriteChange) {
            console.log("onFavoriteChange?");
            onFavoriteChange();
          }
        }
      } else {
        const res = await axios.post("/api/favorite/add", favoriteData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          if (onFavoriteChange) {
            console.log("onFavoriteChange?");
            onFavoriteChange();
          }
          console.log("add res: ", res);
        }
      }
      // 즐겨찾기 업데이트
      fetchFavorite();
    } catch (error) {
      console.log("favorite err : ", error);
    }
  };

  const scoreCheck = (score: any) => {
    if (score == "NaN") {
      return 0;
    } else {
      return score;
    }
  };

  return (
    <>
      <CardLayout>
        <TopBox>
          <TitleBox>{barName}</TitleBox>
          {isLoggedIn ? (
            <FavoriteBox>
              <FavoriteImg onClick={handleFavorite}>
                <img
                  src={
                    isFavorite
                      ? "assets/images/mypage_favorite_active.png"
                      : "assets/images/mypage_favorite_nonactive.png"
                  }
                  alt="Score"
                />
              </FavoriteImg>
            </FavoriteBox>
          ) : (
            <FavoriteBox></FavoriteBox>
          )}
        </TopBox>

        <ContentLayout>
          <Link
            to={`/ohsul/bar/${barId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <LeftContent>
              <ImgBox>
                <img
                  src={
                    imageError
                      ? "/assets/images/common_alternateImage.png"
                      : barImg
                      ? barImg
                      : ""
                  }
                  alt={barName}
                  onError={() => setImageError(true)}
                />
              </ImgBox>
              <ScoreBox>
                <ScoreImg>
                  <img
                    src={
                      process.env.PUBLIC_URL + "assets/images/common_star.png"
                    }
                    alt="Score"
                  />
                </ScoreImg>
                <ScoreText>{scoreCheck(score)}</ScoreText>
              </ScoreBox>
            </LeftContent>
          </Link>
          <RightContent>
            <ContentWrapper>
              {content ? (
                <ReviewBox>{content}</ReviewBox>
              ) : (
                <ReviewBox>
                  작성된 리뷰가 없습니다 ! <br />
                  <br /> 리뷰를 작성해주세요
                </ReviewBox>
              )}
              <Button>
                <Link
                  to={`/ohsul/bar/${barId}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  GO
                </Link>
              </Button>
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
  color: ${({ theme }) => theme.colors.darkFont};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 5px;

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
  cursor: pointer;
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

  /* width: 355px; */
  width: 100%;
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
  font-size: 12px;
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
