import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router";
import useAuthStore from "../../stores/useAuthStore";
import { FavoriteBar } from "../../types/Common";

type UserParams = {
  barId: any;
};

const BarInfoPage = () => {
  const navigate = useNavigate();

  const { barId } = useParams<UserParams>();
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  console.log("barId??", barId);

  const [barInfo, setBarInfo] = useState({
    barId: barId,
    barName: "",
    barImg: "",
    description: "",
    telephone: "",
    alcoholTags: "",
    moodTags: "",
    parkingArea: "",
    snack: "",
    toilet: "",
  });

  useEffect(() => {
    getBarInfo();
  }, [barId]);

  // 바 정보 불러오기 barId로 수정
  const getBarInfo = async () => {
    try {
      const res = await axios.get(`/api/ohsul/bar/${barId}`);
      console.log(res.data, "응답와라젭아");
      setBarInfo(res.data);
      console.log("barInfo", barInfo);
    } catch (error) {
      console.log("get err", error);
    }
  };

  const handleBarReview = () => {
    navigate(`/ohsul/${barId}/review`, { state: { barInfo } });
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteBarId, setFavoriteBarId] = useState<number[]>([]);
  const [isFavoritePlace, setIsFavoritePlace] = useState<boolean>(false);
  const [favoriteData, setFavoriteData] = useState<FavoriteBar[]>([]);

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

          console.log("onFavoriteChange?");
          setIsFavorite(false);
          reloadFavorites();
        }
      } else {
        const res = await axios.post("/api/favorite/add", favoriteData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          console.log("onFavoriteChange?");
          setIsFavorite(true);
          reloadFavorites();

          console.log("add res: ", res);
        }
      }
      // 즐겨찾기 업데이트
      fetchFavorite();
    } catch (error) {
      console.log("favorite err : ", error);
    }
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
          setIsFavoritePlace(false);
        }
      }
    } catch (error) {
      console.error("Error reloading favorites: ", error);
    }
  };
  return (
    <>
      <BarPageLayout>
        <Header title="가게 상세 정보" />
        <BackButton />
        <BarInfoWrapper>
          <BarImgBox>
            {barInfo.barImg ? (
              <img src={barInfo.barImg} />
            ) : (
              <img src="/assets/images/common_AlternateImage.png" />
            )}
          </BarImgBox>
          <BarNameBox>{barInfo.barName}</BarNameBox>
          {isLoggedIn ? (
            <FavoriteBox>
              <FavoriteImg onClick={handleFavorite}>
                <img
                  src={
                    isFavorite
                      ? "/assets/images/mypage_favorite_active.png"
                      : "/assets/images/mypage_favorite_nonactive.png"
                  }
                  alt="Favorite"
                />
              </FavoriteImg>
            </FavoriteBox>
          ) : (
            <FavoriteBox></FavoriteBox>
          )}
          <BarExplainBox>{barInfo.description}</BarExplainBox>
          <BarNumberBox>{barInfo.telephone}</BarNumberBox>
          <BarShareBox>
            <div>
              <img src="/assets/images/bar_share.png" alt="bar_share" />
            </div>
            <div>카카오톡으로 공유하기</div>
          </BarShareBox>
        </BarInfoWrapper>
        <DotImgBox>
          <img src="/assets/images/border_dot.png" alt="border_dot" />
        </DotImgBox>
        {/* 태그 넣어오기 */}
        <DotImgBox>
          <img src="/assets/images/border_dot.png" alt="border_dot" />
        </DotImgBox>

        <ReviewButton onClick={handleBarReview}>리뷰 보러 가기</ReviewButton>
      </BarPageLayout>
      {/* 정적 이미지 지도 만들기..?  실패 !*/}
    </>
  );
};

const BarPageLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  margin-bottom: 78px;
`;

const BarInfoWrapper = styled.div``;

const BarImgBox = styled.div`
  img {
    width: 160px;
    height: 160px;
  }
`;

const BarNameBox = styled.div`
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-size: 22px;
  margin: 14px 0px;
`;

const BarExplainBox = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const BarNumberBox = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
`;

const BarShareBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  img {
  }
`;

const DotImgBox = styled.div`
  margin: 20px 0px;
`;

const ReviewButton = styled.button`
  font-size: 18px;
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.btnBlue};
  color: ${({ theme }) => theme.colors.lightFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  outline: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;
const BasicStyle = `
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
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
export default BarInfoPage;
