import React, { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import * as S from "./FavoritePageStyle";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";
import CommonModal from "../../../components/common/CommonModal";
import { useNavigate } from "react-router";

const FavoritePage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);

  //✅ 어떻게 들어오냐
  useEffect(() => {
    const { userId } = useAuthStore.getState();

    const FetchData = async () => {
      try {
        const res = await axios.get("/api/mypage/favorite", {
          params: { userId },
        });
        if (res.status == 200) {
          console.log("FavoritePage res: ", res);
          console.log("FavoritePage res.data", res.data);
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
        <div>즐겨찾기 장소</div>
        {modalOpen && (
          <CommonModal
            message={
              <>
                아직 즐겨찾기 한 장소가 없어요. <br /> 내 근처 술집 둘러보러
                가기 😀
              </>
            }
            isClose={true}
            onConfirm={handleNavigate}
          />
        )}
      </S.FavoritePageLayout>
    </>
  );
};

export default FavoritePage;
