import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import useAuthStore from "../../stores/useAuthStore";
import useFavoriteStore from "../../stores/useFavoriteStore";
import { Link } from "react-router-dom";
import { FavoriteBar } from "../../types/Common";
import {
  useAlcoholTags,
  useMoodTags,
  useMusicTags,
} from "../../hooks/tagsChange";

const CardColTag: React.FC<FavoriteBar> = ({
  barName,
  barImg,
  score,
  alcoholTags,
  moodTags,
  musicTags,
  barId,
  barPhone,
}) => {
  // const tagData = { alcoholTags, moodTags, musicTags };
  // console.log(tagData, "태그데타");
  // const drink: number[] = tagData.alcoholTags;
  // const mood: number[] = tagData.moodTags;
  // const music: number[] = tagData.musicTags;
  const getAlcoholTagName = useAlcoholTags();
  const getMusicTagName = useMusicTags();
  const getMoodTagName = useMoodTags();
  const { userNumber } = useAuthStore.getState();

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteBarId, setFavoriteBarId] = useState<number[]>([]);
  const [imageError, setImageError] = useState(false);

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
        //console.log("favoriteList res : ", res);
        console.log("favoriteList res.data : ", res.data);
      }
    } catch (error) {
      console.log("fetch Favorite err: ", error);
    }
  };

  //------------------------------즐겨찾기 zustand
  // const favoriteStore = useFavoriteStore();

  // const handleToggleFavorite = (barId: number) => {
  //   favoriteStore.toggleFavorite(barId);
  // };

  //------------------------------

  // const handleFavorite = async () => {
  //   console.log("favorite click");
  //   const favoriteData = {
  //     barId: barId,
  //   };
  //   console.log(favoriteData);
  //   try {
  //     const res = await axios.post("/api/favorite/add", favoriteData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (res.status == 200) {
  //       console.log(res);
  //       console.log(res.data);
  //     }
  //   } catch (error) {
  //     console.log("favorite add err: ", error);
  //   }
  // };

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
        }
      } else {
        const res = await axios.post("/api/favorite/add", favoriteData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          console.log("add res: ", res);
        }
      }
      // 즐겨찾기 업데이트
      fetchFavorite();
    } catch (error) {
      console.log("favorite err : ", error);
    }
  };

  return (
    <>
      <CardLayout>
        <LeftContent>
          <Link
            to={`/ohsul/bar/${barId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <TitleBox>{barName}</TitleBox>

            <ImgBox>
              <img
                src={
                  imageError
                    ? process.env.PUBLIC_URL +
                      "assets/images/common_alternateImage.png"
                    : barImg
                    ? process.env.PUBLIC_URL + barImg
                    : ""
                }
                alt={barName}
                onError={() => setImageError(true)}
              />
            </ImgBox>
            <ScoreBox>
              <ScoreImg>
                <img
                  src={process.env.PUBLIC_URL + "assets/images/common_star.png"}
                  alt="Score"
                />
              </ScoreImg>
              <ScoreText>{score}</ScoreText>
            </ScoreBox>
          </Link>
        </LeftContent>
        <RightContent>
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
          <TagLayout>
            {alcoholTags?.length === 0 ? (
              <TagBox>
                <TagTitle>술</TagTitle>
                <TagContent>아직 태그가 없어요</TagContent>
              </TagBox>
            ) : (
              <TagBox>
                <TagTitle>술</TagTitle>
                {alcoholTags?.slice(0, 2).map((item, index) => (
                  <TagContent key={index}>{getAlcoholTagName(item)}</TagContent>
                ))}
              </TagBox>
            )}

            {moodTags?.length === 0 ? (
              <TagBox>
                <TagTitle>분위기</TagTitle>
                <TagContent>아직 태그가 없어요</TagContent>
              </TagBox>
            ) : (
              <TagBox>
                <TagTitle>분위기</TagTitle>
                {moodTags?.slice(0, 2).map((item, index) => (
                  <TagContent key={index}>{getMoodTagName(item)}</TagContent>
                ))}
              </TagBox>
            )}

            {musicTags?.length === 0 ? (
              <TagBox>
                <TagTitle>음악</TagTitle>
                <TagContent>아직 태그가 없어요</TagContent>
              </TagBox>
            ) : (
              <TagBox>
                <TagTitle>음악</TagTitle>
                {musicTags?.slice(0, 2).map((item, index) => (
                  <TagContent key={index}>{getMusicTagName(item)}</TagContent>
                ))}
              </TagBox>
            )}
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
  margin-bottom: 5px;
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
  margin-bottom: 5px;
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
