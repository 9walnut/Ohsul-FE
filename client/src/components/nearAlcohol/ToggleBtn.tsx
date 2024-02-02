import React from "react";
import styled from "styled-components";

const ToggleBtn = () => {
  return (
    <>
      <ToggleLayout>
        <ToggleLeftBox>
          <ToggleLeftText>지도 보기</ToggleLeftText>
        </ToggleLeftBox>
        <ToggleRightBox>
          <ToggleRightText>리스트 보기</ToggleRightText>
        </ToggleRightBox>
      </ToggleLayout>
    </>
  );
};

export default ToggleBtn;

const ToggleLayout = styled.div`
  position: absolute;
  height: 46px;
  left: 24px;
  right: 23px;
  /* top: 793px; */
  bottom: 80px;
`;

const ToggleLeftBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #f4ede6;
  border: 1px solid #4d607b;
  border-radius: 100px;
`;
const ToggleLeftText = styled.div`
  position: absolute;
  width: 57px;
  height: 27px;
  left: calc(50% - 57px / 2 - 83px);
  top: calc(50% - 27px / 2 - 0.5px);
  font-family: "Yeongdeok Sea";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  z-index: 2;
  color: #fcfaf9;
`;

const ToggleRightBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  width: 200px;
  background: #4d607b;
  border: 1px solid #4d607b;
  border-radius: 100px;
`;

const ToggleRightText = styled.div`
  position: absolute;
  width: 70px;
  height: 27px;
  left: 123%;
  top: calc(50% - 27px / 2 - 0.5px);
  font-family: "Yeongdeok Sea";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #4d607b;
`;
