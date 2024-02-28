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
import CommonModal from "../../components/common/CommonModal";
import {
  useAlcoholTags,
  useMoodTags,
  useMusicTags,
} from "../../hooks/tagsChange";

type UserParams = {
  barId: any;
};

const BarInfoPage = () => {
  const getAlcoholTagName = useAlcoholTags();
  const getMusicTagName = useMusicTags();
  const getMoodTagName = useMoodTags();
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState(false);
  const [tags, setTags] = useState({
    alcoholTags: [],
    moodTags: [],
    musicTags: [],
  });
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
      setTags({
        alcoholTags: res.data.alcoholTags,
        moodTags: res.data.moodTags,
        musicTags: res.data.musicTags,
      });
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

  useEffect(() => {
    if (barId) {
      setIsFavorite(favoriteBarId.includes(barId));
    }
  }, [favoriteBarId, barId]);

  //---favorite add delete
  const handleFavorite = async () => {
    console.log("favorite click");
    const favoriteData = {
      barId: barId,
    };
    console.log(favoriteData);
    try {
      const res = await axios.post("/api/favorite/add", favoriteData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        console.log("즐겨찾기 성공");
        setIsModal(true);

        console.log("add res: ", res);
      }
    } catch (error) {
      console.log("favorite err : ", error);
    }
  };

  return (
    <>
      {isModal && (
        <CommonModal
          message={
            <>
              즐겨찾기 장소가 저장되었습니다. <br /> 마이페이지에서 즐겨찾기
              목록을 확인해보세요!🍻
            </>
          }
          isClose={false}
        />
      )}
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
            <AddFavoriteBtnWrapper>
              <AddFavoriteBtn onClick={handleFavorite}>
                장소 저장하기
              </AddFavoriteBtn>
            </AddFavoriteBtnWrapper>
          ) : (
            <AddFavoriteBtnWrapper></AddFavoriteBtnWrapper>
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
        <TagLayout>
          {tags.alcoholTags?.length === 0 ? (
            <TagBox>
              <TagTitle>술</TagTitle>
              <TagContent>아직 태그가 없어요</TagContent>
            </TagBox>
          ) : (
            <TagBox>
              <TagTitle>술</TagTitle>
              {tags.alcoholTags?.slice(0, 5).map((item, index) => (
                <TagContent key={index}>{getAlcoholTagName(item)}</TagContent>
              ))}
            </TagBox>
          )}

          {tags.moodTags?.length === 0 ? (
            <TagBox>
              <TagTitle>분위기</TagTitle>
              <TagContent>아직 태그가 없어요</TagContent>
            </TagBox>
          ) : (
            <TagBox>
              <TagTitle>분위기</TagTitle>
              {tags.moodTags?.slice(0, 5).map((item, index) => (
                <TagContent key={index}>{getMoodTagName(item)}</TagContent>
              ))}
            </TagBox>
          )}

          {tags.musicTags?.length === 0 ? (
            <TagBox>
              <TagTitle>음악</TagTitle>
              <TagContent>아직 태그가 없어요</TagContent>
            </TagBox>
          ) : (
            <TagBox>
              <TagTitle>음악</TagTitle>
              {tags.musicTags?.slice(0, 5).map((item, index) => (
                <TagContent key={index}>{getMusicTagName(item)}</TagContent>
              ))}
            </TagBox>
          )}
        </TagLayout>
        <DotImgBox>
          <img src="/assets/images/border_dot.png" alt="border_dot" />
        </DotImgBox>

        <ReviewButton onClick={handleBarReview}>리뷰 보러 가기</ReviewButton>
      </BarPageLayout>
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

const AddFavoriteBtnWrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;
const AddFavoriteBtn = styled.button`
  cursor: pointer;
  width: 100px;
  height: 27px;
  background-color: ${({ theme }) => theme.colors.bgColor};
  border: 1px solid ${({ theme }) => theme.colors.iconBlue};
  border-radius: 10px;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: center;

  color: ${({ theme }) => theme.colors.blueFont};

  img {
    width: 16px;
    height: 22px;
    object-fit: contain;
  }
`;

const TagLayout = styled.div`
  width: 100%;
  /* height: 71px; */
  margin-bottom: 14px;
`;

const TagBasic = `
height: 20px;
font-size: 14px;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
margin: 2px 1px;
`;

const TagTitle = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  margin-bottom: 8px;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
`;

const TagContent = styled.div`
  display: inline;
  color: ${({ theme }) => theme.colors.bgColor};
  background: ${({ theme }) => theme.colors.mainBlue};
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  padding: 12px;
  margin: 4px;
  ${TagBasic}
`;
export default BarInfoPage;
