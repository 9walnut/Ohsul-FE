import React, { useState } from "react";
import styled from "styled-components";

interface ToggleProps {
  viewMap: boolean;
}

const Toggle2: React.FC = () => {
  const [viewMap, setViewMap] = useState(true);

  const toggleHandler = () => {
    setViewMap((prev) => !prev);
  };

  return (
    <BtnWrapper>
      <CheckBox type="checkbox" id="toggleBtn" onChange={toggleHandler} />
      <ButtonLabel htmlFor="toggleBtn" viewMap={viewMap}>
        {/* {viewMap ? "지도 보기" : "리스트 보기"} */}
      </ButtonLabel>
    </BtnWrapper>
  );
};

export default Toggle2;

const BtnWrapper = styled.div`
  display: flex;
  z-index: 0;
`;

const CheckBox = styled.input`
  display: none;
`;

const ButtonLabel = styled.label<ToggleProps>`
  z-index: 10;

  width: 12rem;
  height: 3rem;
  border-radius: 2em;
  background-color: ${({ viewMap }) => (viewMap ? "#4d607b" : "#F4EDE6")};
  color: ${({ viewMap }) => (viewMap ? "white" : "#4d607b")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid #4d607b;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &::before {
    display: flex;
    position: absolute;
    content: "지도 보기";
    font-family: "Yeongdeok Sea";
    /* border: 1px solid #4d607b; */
    /* z-index: 11; */
    /* 좌측에 text */
    justify-content: flex-start;
    align-items: center;
    /* before가 이동할 경로의 길이만큼 width 지정 */
    /* width: 10rem; */
    height: 3rem;
    /* color: #4d607b; */
    font-weight: lighter;
    transition: all 0.2s ease-in-out;
  }
  &::after {
    display: flex;
    position: relative;
    content: "리스트 보기";
    font-family: "Yeongdeok Sea";
    border: 1px solid #4d607b;
    width: 12rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    /* false일 때 오른쪽이어야함. 전체 길이의 반 만큼 이동 */
    left: 10rem;
    font-weight: bolder;
    border-radius: 2rem;
    background-color: ${({ viewMap }) => (viewMap ? "" : "#4d607b")};
    color: ${({ viewMap }) => (viewMap ? "#4d607b" : "white")};
    /* box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16); */
    transition: all 0.2s ease-in-out;
  }

  /* &::before {
    left: 0;
    transform: ${({ viewMap }) =>
    viewMap ? "translateX(0)" : "translateX(-6rem)"};
  }

  &::after {
    right: 0;
    transform: ${({ viewMap }) =>
    viewMap ? "translateX(6rem)" : "translateX(0)"};
  } */
`;
