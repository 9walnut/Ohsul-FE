import React from "react";
import Header from "../../components/common/Header";
import ExplainBox from "../../components/main/ExplainBox";
import useAuthStore from "../../stores/useAuthStore";
import SlickSlider from "../../components/common/SlickSlider";
import MainTitleList from "../../components/common/MainTitleList";

//DUMMY
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
const DUMMYTags = {
  alcohol: ["alcohol_1", "alcohol_2", "alcohol_5"],
  music: ["music_3", "music_5"],
  mood: ["mood_1", "mood_3"],
  etc: ["etc_1"],
  snack: ["snack_2"],
};

const MainPage: React.FC = () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  console.log(
    "zustand MainPage isLoggedIn:",
    useAuthStore.getState().isLoggedIn
  );

  const iconLocation = "/assets/images/main_location.png";
  const iconHot = "/assets/images/main_hot.png";
  const iconPick = "/assets/images/main_pick.png";

  return (
    <>
      <Header title="오늘의 술" />
      <ExplainBox />
      <MainTitleList title="내 근처 힙한 술집" icon={iconLocation} />
      <SlickSlider></SlickSlider>
      <MainTitleList title="지금 핫한 술집" icon={iconHot} />
      <SlickSlider></SlickSlider>
      <MainTitleList title="내가 저장한 술집" icon={iconPick} />
      <SlickSlider></SlickSlider>
    </>
  );
};

export default MainPage;
