import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import axios from "axios";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import CardColTag from "../../components/common/CardColTag";
import { Button } from "./BarPageStyle";
import BarReviewCard from "../../components/common/BarReviewCard";
import { CardBarReview } from "../../types/Common";
import * as S from "./BarPageStyle";

const BarReviewPage = () => {
  const { barId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { barInfo } = location.state;
  const [reviewData, setReviewData] = useState<CardBarReview[]>([]);

  // const {review, setReview} = useState({});

  useEffect(() => {
    getReview();
    console.log("barInfo", barInfo);
  }, [barId]);

  const getReview = async () => {
    try {
      const res = await axios.get(`/api/ohsul/${barId}/review`);
      console.log("getReview res", res);
      console.log("barInfo", barInfo);
      console.log("res.datadatadatadata", res.data);
      setReviewData(res.data);
      console.log(reviewData, "리뷰데타");
    } catch (error) {
      console.log("getReview err", error);
    }
  };

  const handleAddReview = () => {
    navigate(`/ohsul/${barId}/addReview`);
  };

  return (
    <>
      <S.ReviewPageLayout>
        <Header title="리뷰" />
        <BarTitleWrapper>
          <BarTitle>{barInfo.barName}</BarTitle>
          <BarRating>3.5</BarRating>
        </BarTitleWrapper>

        {reviewData ? (
          <>
            {reviewData.map((review, index) => (
              <BarReviewCard
                key={index}
                barId={barInfo.barId}
                reviewId={review.reviewId}
                alcoholTags={review.alcoholTags}
                moodTags={review.moodTags}
                musicTags={review.musicTags}
                nickname={review.nickname}
                score={review.score}
                reviewImg={review.reviewImg}
                tag={review.tag}
                content={review.content}
                date={review.date}
              />
            ))}
          </>
        ) : (
          <S.NoReviewBox>아직 등록된 리뷰가 없어요 🥹</S.NoReviewBox>
        )}

        <Button onClick={handleAddReview}>리뷰 작성 하기</Button>
      </S.ReviewPageLayout>
    </>
  );
};

const BarTitleWrapper = styled.div`
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid #4d607b;
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;

const BarTitle = styled.div`
  font-size: 24px;
`;

const BarRating = styled.div``;

export default BarReviewPage;
