import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router";

type BarInfo = {
  barId: string;
  barName: string;
  barImg: string;
  description: string;
  telephone: string;
  alcoholTags: string;
  moodTags: string;
  parkingArea: string;
  snack: string;
  toilet: string;
};

const BarInfoPage = () => {
  const navigate = useNavigate();

  const { barId } = useParams() as {
    barId: string;
  };

  console.log("폰넘버??", barId);

  const [barInfo, setBarInfo] = useState<BarInfo>({
    barId: "",
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

  return (
    <>
      <Header title="가게 상세 정보" />
      <BackButton />
      <BarPageLayout>
        <BarInfoWrapper>
          <BarImgBox>
            {barInfo.barImg ? (
              <img src={barInfo.barImg} />
            ) : (
              <img src="/assets/images/common_AlternateImage.png" />
            )}
          </BarImgBox>
          <BarNameBox>{barInfo.barName}</BarNameBox>
          <BarExplainBox>{barInfo.description}</BarExplainBox>
          <BarShareBox>
            <div>
              <img src="/assets/images/bar_share.png" alt="bar_share" />
            </div>
            <div>공유하기</div>
          </BarShareBox>
        </BarInfoWrapper>
        <img src="/assets/images/border_dot.png" alt="border_dot" />
        <img src="/assets/images/border_dot.png" alt="border_dot" />

        <ReviewButton onClick={handleBarReview}>리뷰 보러 가기</ReviewButton>
      </BarPageLayout>
      {/* 정적 이미지 지도 만들기..? */}
    </>
  );
};

const BarPageLayout = styled.div``;

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
`;

const BarExplainBox = styled.div`
  font-size: 14px;
`;

const BarShareBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  img {
  }
`;

const ReviewButton = styled.button`
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

export default BarInfoPage;
