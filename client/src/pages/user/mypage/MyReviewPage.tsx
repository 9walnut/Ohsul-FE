import React, { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import * as S from "./MyReviewPageStyle";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";
import BarReviewCard from "../../../components/common/BarReviewCard";
import { CardBarReview } from "../../../types/Common";

//DUMMY
// const reviewCount = 2;
// const DUMMYReview = [
//   {
//     barName: "언더그라운드",
//     userNickname: "졸린공룡",
//     score: 4,
//     barImg:
//       "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
//     tag: {
//       drink: ["칵테일", "양주"],
//       mood: ["이야기 나누기 적당한"],
//       music: ["힙합"],
//     },
//     content:
//       "이러코저러코 리뷰리뷰리뷰리뷰리뷰 리뷰가 들어와여 리뷰리뷰리뷰리뷰 뷰가 들어와여 리뷰리뷰리뷰리뷰 리뷰가 들어와여 리뷰없으면 공백! 85자 이내 작성!",
//     date: "2024-02-22",
//   },
//   {
//     barName: "언더그라운드",
//     userNickname: "졸린공룡",
//     score: 2,
//     barImg:
//       "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzAyMDNfNjkg%2FMDAxNjc1MzU3OTAwMDc1.nDuEbsyEjQNKrN5JJn4PN7QN2himoQXkjdsOidYPEQ4g.hc5nBIjfzB85bNZRKiYcGhwY3ETdxAtLQUQhAi_hZ3cg.JPEG%2Fimage.jpg",
//     tag: {
//       drink: ["칵테일", "양주"],
//       mood: ["다같이 즐기는"],
//       music: ["힙합"],
//     },
//     content: "이러코저러코 ",
//     date: "2024-02-26",
//   },
// ];

const MyReviewPage = () => {
  const [isReview, setIsReview] = useState(true);
  const [reviewData, setReviewData] = useState<CardBarReview[]>([]);

  useEffect(() => {
    const { userId } = useAuthStore.getState();
    const FetchData = async () => {
      try {
        const res = await axios.get("/api/mypage/myReview", {
          params: { userId },
        });
        if (res.status == 200) {
          const { reviews, userNickname } = res.data;
          setReviewData(reviews);

          console.log("User nickname:", userNickname);
          console.log("MyReviewPage res: ", res);
          console.log("MyReviewPage res.data: ", res.data);
          console.log("Review data:", reviewData);
        }
      } catch (error) {
        console.log("myReview render error : ", error);
      }
    };
    FetchData();
  }, []);
  return (
    <>
      <S.MyReviewPageLayout>
        <S.ReviewCount>총 {reviewData.length}개의 리뷰</S.ReviewCount>
        <p> content, reviewId 만 들어옴</p>
        {isReview ? (
          <>
            {reviewData.map((review, index) => (
              <BarReviewCard
                key={index}
                userNickname={review.userNickname}
                score={review.score}
                barImg={review.barImg}
                tag={review.tag}
                content={review.content}
                date={review.date}
              />
            ))}
          </>
        ) : (
          <>
            <S.NoReviewBox>아직 등록된 리뷰가 없어요.</S.NoReviewBox>
          </>
        )}
      </S.MyReviewPageLayout>
    </>
  );
};

export default MyReviewPage;
