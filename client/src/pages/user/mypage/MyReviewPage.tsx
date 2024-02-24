import React, { useEffect } from "react";
import Header from "../../../components/common/Header";
import * as S from "./MyReviewPageStyle";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";

//DUMMY
const reviewCount = 2;

const MyReviewPage = () => {
  //✅ 어떻게 들어오냐
  useEffect(() => {
    const { userId } = useAuthStore.getState();
    const FetchData = async () => {
      try {
        const res = await axios.get("/api/mypage/myReview", {
          params: { userId },
        });
        if (res.status == 200) {
          console.log("MyReviewPage res: ", res);
          console.log("MyReviewPage res.data: ", res.data);
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
        <S.ReviewCount>총 {reviewCount}개의 리뷰</S.ReviewCount>
        <S.NoReviewBox>아직 등록된 리뷰가 없어요.</S.NoReviewBox>
      </S.MyReviewPageLayout>
    </>
  );
};

export default MyReviewPage;
