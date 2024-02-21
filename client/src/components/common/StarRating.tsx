import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const RatingContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 13px 0px;

  .inactive {
    color: #4d607b;
  }
  .active {
    color: #fabf35;
  }
`;

const RatingStar = styled(AiFillStar)`
  cursor: pointer;
`;

const RatingScore = styled.div`
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;

interface RatingSectionProps {
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
}

function StarRating({ ratingIndex, setRatingIndex }: RatingSectionProps) {
  const ArrayIndexes = [1, 2, 3, 4, 5];
  console.log("별점", ratingIndex);

  return (
    <>
      <RatingContainer>
        {ArrayIndexes.map((arrayindex, index) => (
          <RatingStar
            size={35}
            key={`rating_${index}`}
            className={arrayindex <= ratingIndex ? "active" : "inactive"}
            onClick={() => setRatingIndex(arrayindex)}
          />
        ))}
      </RatingContainer>
      <RatingScore>{ratingIndex} / 5 (필수선택)</RatingScore>
    </>
  );
}

export default StarRating;
