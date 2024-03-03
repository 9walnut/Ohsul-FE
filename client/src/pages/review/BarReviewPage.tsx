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
import BackButton from "../../components/common/BackButton";

const BarReviewPage = () => {
  const { barId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { barInfo } = location.state;
  const [reviewData, setReviewData] = useState<CardBarReview[]>([]);
  const [isReview, setIsReview] = useState(false);

  const getReview = async () => {
    try {
      const res = await axios.get(`/api/ohsul/${barId}/review`);

      if (res.status == 200) {
        setReviewData(res.data);
        //setIsReview(true);
        if (res.data.length !== 0) {
          setIsReview(true);
          //setReviewData(reviewData);
        } else {
          setIsReview(false);
        }
      }
      console.log("getReview res", res);
      console.log("barInfo", barInfo);
      console.log("res.data", res.data);
      console.log(reviewData, "리뷰데타");
    } catch (error) {
      console.log("getReview err", error);
    }
  };

  useEffect(() => {
    getReview();
    console.log("barInfo", barInfo);
  }, [barId]);

  const handleAddReview = () => {
    navigate(`/ohsul/${barId}/addReview`);
  };

  return (
    <>
      <S.ReviewPageLayout>
        <Header title="리뷰" />
        <BackButton />
        <BarTitleWrapper>
          <BarTitle>{barInfo.barName}</BarTitle>
          {/* <BarRating>3.5</BarRating> */}
        </BarTitleWrapper>

        {isReview ? (
          <>
            {reviewData.map((review, index) => (
              <BarReviewCard
                key={index}
                //@ts-ignore
                barId={barId}
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
                onDeleteSuccess={getReview}
              />
            ))}
          </>
        ) : (
          <S.NoReviewBox>
            <>
              아직 등록된 리뷰가 없어요. 🥹 <br /> 가장 먼저 리뷰를 작성해보세요.
            </>
          </S.NoReviewBox>
        )}

        <Button onClick={handleAddReview}>리뷰 작성 하기</Button>
      </S.ReviewPageLayout>
    </>
  );
};

const BarTitleWrapper = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #4d607b;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  margin-bottom: 12px;
`;

const BarTitle = styled.div`
  font-size: 24px;
`;

const BarRating = styled.div``;

export default BarReviewPage;
