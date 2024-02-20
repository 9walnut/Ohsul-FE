import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import ExplainBox from "../../components/main/ExplainBox";
import StarRating from "../../components/common/StarRating";
import CommonModal from "../../components/common/CommonModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import CardRow from "../../components/common/CardRow";
import SlickSlider from "../../components/common/SlickSlider";
import TagBox from "../../components/ohsulTag/TagBox";
import SwiperSlider from "../../components/common/SwiperSlider";

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

const MainPage: React.FC = () => {
  const [ratingIndex, setRatingIndex] = useState(1);

  //오술태그 선택된 값 넣기
  const DUMMYTags = {
    alcohol: ["alcohol_1", "alcohol_2", "alcohol_5"],
    music: ["music_3", "music_5"],
    mood: ["mood_1", "mood_3"],
    etc: ["etc_1"],
    snack: ["snack_2"],
  };

  return (
    <>
      <Header title="오늘의 술" />
      <ExplainBox />
      <div>메인 떴냐</div>
      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
      {/* <CommonModal
        message="메시지이이ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ"
        isClose={true}
      />
      <ConfirmModal
        message="메시지이이ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ"
        isClose={true}
      /> */}
      <SwiperSlider />
      <br />
      <br />
      <NavLink to={"/barReviews/addReview"}>리뷰페이지 이동</NavLink>
      <TagBox checkedTags={DUMMYTags} />
      {/* <TagBox /> */}
    </>
  );
};

export default MainPage;
