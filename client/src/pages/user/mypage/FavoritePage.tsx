import React, { useEffect, useState } from "react";
import * as S from "./FavoritePageStyle";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router";
import CardColTag from "../../../components/common/CardColTag";
import { FavoriteBar } from "../../../types/Common";
import OnlyMember from "../../../components/common/OnlyMember";
import { MyPageLayout } from "./MyPageStyle";

const FavoritePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const [modalOpen, setModalOpen] = useState(false);
  const [isFavoritePlace, setIsFavoritePlace] = useState<boolean>(false);
  const [favoriteData, setFavoriteData] = useState<FavoriteBar[]>([]);

  useEffect(() => {
    const { userId } = useAuthStore.getState();
    setIsFavoritePlace(false);
    const FetchData = async () => {
      try {
        const res = await axios.get("/api/mypage/favorite");
        if (res.status == 200) {
          //console.log("FavoritePage res: ", res);
          //console.log("FavoritePage res.data", res.data.favorites);
          const favoriteList = res.data.favorites;
          //console.log(favoriteList.length);
          if (favoriteList.length !== 0) {
            setIsFavoritePlace(true);
            setFavoriteData(favoriteList);
          } else {
            setModalOpen(true);
            setIsFavoritePlace(false);
          }
        }
      } catch (error) {
        console.log("favorite render error : ", error);
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    //console.log("데이터바낌");
  }, [favoriteData]);

  const handleNavigate = () => {
    navigate("/near");
  };

  const reloadFavorites = async () => {
    try {
      const res = await axios.get("/api/mypage/favorite");
      if (res.status == 200) {
        const favoriteList = res.data.favorites;
        if (favoriteList.length !== 0) {
          setIsFavoritePlace(true);
          setFavoriteData(favoriteList);
        } else {
          setModalOpen(true);
          setIsFavoritePlace(false);
        }
      }
    } catch (error) {
      console.error("Error reloading favorites: ", error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <MyPageLayout>
            <S.FavoritePageLayout>
              <S.FavoriteCount>
                총 {favoriteData.length}개의 즐겨찾기 목록
              </S.FavoriteCount>
              {isFavoritePlace ? (
                <>
                  {favoriteData.map((content, index) => (
                    <CardColTag
                      key={index}
                      barId={content.barId}
                      barName={content.barName}
                      score={content.avgScore}
                      barImg={content.barImg}
                      alcoholTags={content.alcoholTags}
                      moodTags={content.moodTags}
                      musicTags={content.musicTags}
                      onFavoriteChange={reloadFavorites}
                    />
                  ))}
                </>
              ) : (
                <>
                  {modalOpen && (
                    <S.NoFavoritePlaceBox>
                      <S.MessageBox onClick={handleNavigate}>
                        {" "}
                        아직 즐겨찾기 한 장소가 없어요. <br /> 내 근처 술집
                        둘러보러 가기 😀
                      </S.MessageBox>
                    </S.NoFavoritePlaceBox>
                  )}
                </>
              )}
            </S.FavoritePageLayout>
          </MyPageLayout>
        </>
      ) : (
        <>
          <OnlyMember></OnlyMember>
        </>
      )}
    </>
  );
};

export default FavoritePage;
