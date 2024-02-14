import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import KakaoMap01 from "../../components/common/KakaoMap01";
import ToggleBtn from "../../components/nearAlcohol/ToggleBtn";
import CardColTag from "../../components/common/CardColTag";
import CardColReview from "../../components/common/CardColReview";
import BarReviewCard from "../../components/common/BarReviewCard";

import Toggle2 from "../../components/nearAlcohol/Toggle2";

const DUMMYBarReviewCard = {
  userNickname: "졸린공룡",
  score: 4,
  barImg:
    "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
  tag: {
    술: ["칵테일"],
    분위기: ["다같이 즐기는"],
    음악: ["힙합"],
  },
  content:
    "이러코저러코 리뷰리뷰리뷰리뷰리뷰 리뷰가 들어와여 리뷰리뷰리뷰리뷰 뷰가 들어와여 리뷰리뷰리뷰리뷰 리뷰가 들어와여 리뷰없으면 공백! 85자 이내 작성!",
  date: "2024-02-22",
};

const NearAlcoholPage: React.FC = () => {
  return (
    <>
      <PageLayout>
        <Header title="내 주변의 술" />
        <KakaoMap01 width="100%" height="700px" />
        <p>얘는 가로형 카드 태그형</p>
        <CardColTag barName="언더그라운드" />
        <p>얘는 가로형 카드 리뷰형</p>
        <CardColReview barName="언더그라운드" />
        <p>리뷰 페이지에 보여지는 리뷰카드</p>
        <BarReviewCard
          userNickname={DUMMYBarReviewCard.userNickname}
          score={DUMMYBarReviewCard.score}
          barImg={DUMMYBarReviewCard.barImg}
          tag={DUMMYBarReviewCard.tag}
          content={DUMMYBarReviewCard.content}
          date={DUMMYBarReviewCard.date}
        />
        <ToggleBtn />
        <Toggle2 />
      </PageLayout>
    </>
  );
};

export default NearAlcoholPage;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
