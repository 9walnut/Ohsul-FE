import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";

const BarReviewPage = () => {
  return (
    <>
      <Header title="리뷰" />
      <BarTitleWrapper>
        <BarTitle>언더그라운드</BarTitle>
        <BarRating>3.5</BarRating>
      </BarTitleWrapper>
    </>
  );
};

const BarTitleWrapper = styled.div`
  width: 90%;
  padding: 8px;
  border-bottom: 1px solid #4d607b;
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;

const BarTitle = styled.div``;

const BarRating = styled.div``;

export default BarReviewPage;
