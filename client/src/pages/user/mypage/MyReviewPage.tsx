import React, { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import * as S from "./MyReviewPageStyle";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";
import BarReviewCard from "../../../components/common/BarReviewCard";
import { CardBarReview } from "../../../types/Common";

const MyReviewPage = () => {
  const [isReview, setIsReview] = useState(true);
  const [nickName, setNickName] = useState("");
  const [isReviews, setIsReviews] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<CardBarReview[]>([]);

  useEffect(() => {
    const { userId } = useAuthStore.getState();
    const FetchData = async () => {
      try {
        const res = await axios.get("/api/mypage/myReview", {
          params: { userId },
        });
        if (res.status == 200) {
          const { userNickname } = res.data;
          const reviewList = res.data.reviews;
          if (reviewList.length !== 0) {
            setIsReview(true);
            setReviewData(reviewList);
          } else {
            setIsReview(false);
          }

          // console.log("User nickname:", userNickname);
          // console.log("MyReviewPage res: ", res);
          // console.log("MyReviewPage res.data: ", res.data);
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
                barId={review.barId}
                reviewId={review.reviewId}
                userNickname={nickName}
                score={review.score}
                reviewImg={review.reviewImg}
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
