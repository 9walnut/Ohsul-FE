import React from "react";
import styled from "styled-components";

const ExplainBox = () => {
  return (
    <ExplainWrap>
      <img src="/assets/images/main_ohsul.png" alt="explain" />
      <ExplainTextBox>
        <div className="textTop"> 내 취향대로 찾는 오늘의 술집, 오술 ! </div>
        <div className="textCenter">
          오늘은 어떤 술집을 원하세요 ?
          {/* <img src="/assets/images/main_smile.png" alt="smile" /> */}
        </div>
        <div className="textBottom">
          오술만의 태그로 나와 딱 맞는 술집을 찾아보세요 😋
        </div>
      </ExplainTextBox>
    </ExplainWrap>
  );
};

export default ExplainBox;

const ExplainWrap = styled.div`
  /* width: 100%; */
  box-sizing: border-box;
  position: relative;
  font-family: "YeongdeokSea";

  img {
    width: 90%;
    height: auto;
  }
`;

const ExplainTextBox = styled.div`
  width: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .textTop {
    font-size: 16px;
    color: #0f0f0f;
    line-height: 24px;
  }
  .textCenter {
    font-size: 14px;
    color: #0f0f0f;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .textBottom {
    font-size: 12px;
    padding: 2px;
    line-height: 18px;
    background-color: #4d607b;
    border-radius: 4px;
    color: #ffffff;
  }
`;
