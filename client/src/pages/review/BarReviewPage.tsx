import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import axios from "axios";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import CardColTag from "../../components/common/CardColTag";
import { Button } from "./BarPageStyle";

const BarReviewPage = () => {
  const { barId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { barInfo } = location.state;

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
    } catch (error) {
      console.log("getReview err", error);
    }
  };

  const handleAddReview = () => {
    navigate(`/ohsul/${barId}/addReview`);
  };

  return (
    <>
      <Header title="리뷰" />
      <BarTitleWrapper>
        <BarTitle>{barInfo.barName}</BarTitle>
        <BarRating>3.5</BarRating>
      </BarTitleWrapper>

      {/* <CardColTag /> */}

      <Button onClick={handleAddReview}>리뷰 작성 하기</Button>
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
