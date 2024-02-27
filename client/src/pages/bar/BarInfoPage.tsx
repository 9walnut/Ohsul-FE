import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router";

const BarInfoPage = () => {
  const navigate = useNavigate();

  const { barId } = useParams();

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
          <BarNumberBox>{barInfo.telephone}</BarNumberBox>
          <BarShareBox>
            <div>
              <img src="/assets/images/bar_share.png" alt="bar_share" />
            </div>
            <div>공유하기</div>
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

export default BarInfoPage;
