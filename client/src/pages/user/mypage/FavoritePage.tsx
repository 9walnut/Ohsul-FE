import React, { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import * as S from "./FavoritePageStyle";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";
import CommonModal from "../../../components/common/CommonModal";
import { useNavigate } from "react-router";
import CardColTag from "../../../components/common/CardColTag";
import { FavoriteBar } from "../../../types/Common";

//DUMMY
const DUMMYCardColTag = [
  {
    barId: 2,
    barName: "언더그라운드",
    score: 4,
    barImg:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
    tag: {
      drink: ["칵테일", "양주"],
      mood: ["다같이 즐기는", "힙한"],
      music: ["힙합"],
    },
  },
  {
    barId: 3,
    barName: "언더그라운드",
    score: 3,
    barImg:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
    tag: {
      drink: ["칵테일", "양주"],
      mood: ["다같이 즐기는", "힙한"],
      music: ["힙합"],
    },
  },
];

const FavoritePage = () => {
  const navigate = useNavigate();
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
          console.log("FavoritePage res: ", res);
          console.log("FavoritePage res.data", res.data.favorites);
          const favoriteList = res.data.favorites;
          console.log(favoriteList.length);
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

  const handleNavigate = () => {
    navigate("/nearAlcohol");
  };
  return (
    <>
      <S.FavoritePageLayout>
        {isFavoritePlace ? (
          <>
            {favoriteData.map((content, index) => (
              <CardColTag
                key={index}
                barId={content.barId}
                barName={content.barName}
                score={content.score}
                barImg={content.barImg}
                tag={content.tag}
              />
            ))}
          </>
        ) : (
          <>
            {modalOpen && (
              <CommonModal
                message={
                  <>
                    아직 즐겨찾기 한 장소가 없어요. <br /> 내 근처 술집 둘러보러
                    가기 😀
                  </>
                }
                isClose={false}
                onConfirm={handleNavigate}
              />
            )}
          </>
        )}
      </S.FavoritePageLayout>
    </>
  );
};

export default FavoritePage;
