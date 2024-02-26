import React from "react";
import styled from "styled-components";
import axios from "axios";
import useAuthStore from "../../stores/useAuthStore";
import useFavoriteStore from "../../stores/\buseFavoriteStore";
import { Link } from "react-router-dom";
import { CardTag } from "../../types/Common";

const CardColTag: React.FC<CardTag> = ({
  barName,
  barImg,
  score,
  tag,
  barId,
  barPhone,
}) => {
  const tagData = tag || { drink: [], mood: [], music: [] };
  const drink: string[] = tagData.drink;
  const mood: string[] = tagData.mood;
  const music: string[] = tagData.music;

  const { userNumber } = useAuthStore.getState();
  //------------------------------즐겨찾기 zustand
  // const favoriteStore = useFavoriteStore();

  // const handleToggleFavorite = (barId: number) => {
  //   favoriteStore.toggleFavorite(barId);
  // };

  //------------------------------

  const handleFavorite = async () => {
    console.log("favorite click");
    const favoriteData = {
      userNumber: userNumber,
      barId: barId,
    };
    console.log(favoriteData);
    try {
      const res = await axios.post("/api/favorite/add", favoriteData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        console.log(res);
        console.log(res.data);
      }
    } catch (error) {
      console.log("favorite add err: ", error);
    }
  };

  return (
    <>
      <CardLayout>
        <Link
          to={`/ohsul/bar/${barPhone}`}
          style={{ textDecoration: "none" }}
        ></Link>
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
            <FavoriteImg onClick={handleFavorite}>
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/common_favorite.png"
                }
                alt="Score"
              />
            </FavoriteImg>
          </FavoriteBox>
          <TagLayout>
            {" "}
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
        </RightContent>
      </CardLayout>

      {/* zustand test */}
      {/* 아이디 바로 담을 때
      <button onClick={() => handleToggleFavorite(1)}>
       */}
      {/* <FavoriteBox onClick={handleToggleFavorite}>
            <FavoriteImg onClick={handleFavorite}>
              <img
                src={
                  isFavorite ? process.env.PUBLIC_URL + "assets/images/mypage_favorite_active.png" : process.env.PUBLIC_URL + "assets/images/mypage_favorite_nonactive.png"
                }
                alt="Score"
              />
            </FavoriteImg>
          </FavoriteBox> */}
    </>
  );
};

export default CardColTag;

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  gap: 12px;

  width: 382px;
  /* width: 100%; */
  height: 163px;

  background: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid ${({ theme }) => theme.colors.blueFont};
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

  width: 90px;
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

  font-family: ${({ theme }) => theme.fonts.ydFont};
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

  font-family: ${({ theme }) => theme.fonts.ydFont};
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

  width: 100%;
  height: 149px;
`;

const FavoriteBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 3px;

  width: 100%;
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
