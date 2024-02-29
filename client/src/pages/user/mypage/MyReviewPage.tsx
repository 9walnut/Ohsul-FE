import React, { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import * as S from "./MyReviewPageStyle";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";
import BarReviewCard from "../../../components/common/BarReviewCard";
import { CardBarReview } from "../../../types/Common";
import OnlyMember from "../../../components/common/OnlyMember";
import MypageReviewCard from "../../../components/common/MyPageReviewCard";

const MyReviewPage = () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const [isReview, setIsReview] = useState(true);
  const [nickName, setNickName] = useState("");
  const [reviewData, setReviewData] = useState<CardBarReview[]>([]);
  const { userNickname } = useAuthStore.getState();
  const { userId } = useAuthStore.getState();
  const FetchData = async () => {
    try {
      const res = await axios.get("/api/mypage/myReview", {
        params: { userId },
      });
      if (res.status == 200) {
        setNickName(res.data.userNickname);
        console.log(res.data, "마이페이지 리뷰 목록 ");
        const reviewList = res.data.reviews;
        if (reviewList.length !== 0) {
          setIsReview(true);
          setReviewData(reviewList);
        } else {
          setIsReview(false);
        }
        console.log("Review data:", reviewData);
      }
    } catch (error) {
      console.log("myReview render error : ", error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  // const onDeleteReview = async (reviewId: any) => {
  //   // 리뷰 삭제 로직...
  //   try {
  //     await axios.delete(`/api/ohsul/${barId}/review/${reviewId}`);
  //     // 삭제 후 리뷰 목록 새로고침
  //     FetchData();
  //   } catch (error) {
  //     console.error("Review deletion error:", error);
  //   }
  // };

  return (
    <>
      {isLoggedIn ? (
        <>
          <S.MyReviewPageLayout>
            <S.ReviewCount>총 {reviewData.length}개의 리뷰</S.ReviewCount>
            {isReview ? (
              <>
                {reviewData.map((review, index) => (
                  <MypageReviewCard
                    key={index}
                    barId={review.barId}
                    reviewId={review.reviewId}
                    nickname={review.userNickname}
                    score={review.score}
                    reviewImg={review.reviewImg}
                    alcoholTags={review.alcoholTags}
                    moodTags={review.moodTags}
                    musicTags={review.musicTags}
                    content={review.content}
                    date={review.date}
                    barName={review.barName}
                    // @ts-ignore
                    // onDelete={onDeleteReview}
                    onDeleteSuccess={FetchData}
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
      ) : (
        <>
          <OnlyMember></OnlyMember>
        </>
      )}
    </>
  );
};

export default MyReviewPage;
