import React, { useEffect } from "react";
import Header from "../../components/common/Header";
import { useParams } from "react-router";
import styled from "styled-components";
import axios from "axios";
import BackButton from "../../components/common/BackButton";

const BarInfoPage = () => {
  const { barPhone } = useParams() as {
    barPhone: string;
  };
  console.log("폰넘버??", barPhone);

  useEffect(() => {
    getBarInfo();
  }, [barPhone]);

  const getBarInfo = async () => {
    try {
      const res = await axios.get(`/api/ohsul/bar/${barPhone}`);
      console.log(res.data, "응답와라젭아");
    } catch (error) {
      console.log("get err", error);
    }
  };

  return (
    <>
      <Header title="가게 상세 정보" />
      <BackButton />
      <BarPageLayout>
        <BarInfoWrapper>
          <BarImgBox>
            <img src="/assets/images/common_AlternateImage.png" />
          </BarImgBox>
          <BarNameBox>언더그라운드</BarNameBox>
          <BarExplainBox>존맛집임</BarExplainBox>
          <BarShareBox>
            <img src="/assets/images/bar_share.png" alt="" />
            <div>공유하기</div>
          </BarShareBox>
        </BarInfoWrapper>
        <img src="/assets/images/border_dot.png" alt="border_dot" />
        <img src="/assets/images/border_dot.png" alt="border_dot" />
        <ReviewButton>리뷰 보러 가기</ReviewButton>
      </BarPageLayout>
      {/* 정적 이미지 지도 만들기..? */}
    </>
  );
};

const BarPageLayout = styled.div``;

const BarInfoWrapper = styled.div``;

const BarImgBox = styled.div`
  img {
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
