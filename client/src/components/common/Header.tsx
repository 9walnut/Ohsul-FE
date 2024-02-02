import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <HeaderLayout>
        <TitleBox>
          <TitleParagraph>오늘의 술</TitleParagraph>
          <BorderBottom>
            <img src="/assets/images/header_BorderBottom.png" />
          </BorderBottom>
        </TitleBox>
      </HeaderLayout>
    </>
  );
};

export default Header;

const HeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0px;

  /* position: absolute; */
  height: 63px;
  left: 0px;
  right: 0px;
  top: 44px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px 12px 16px;
  gap: 4px;

  width: 390px;
  height: 55px;
`;

const TitleParagraph = styled.div`
  font-family: YeongdeokSea;
  font-style: normal;
  font-weight: 900;
  font-size: 26px;
  line-height: 32px;
  /* or 123% */
  text-align: center;
`;

const BorderBottom = styled.div`
  width: 276px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
// /* title */

// /* Auto layout */
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// padding: 4px 8px 12px 16px;
// gap: 4px;

// width: 390px;
// height: 55px;

// /* Blur / 24px */
// backdrop-filter: blur(12px);
// /* Note: backdrop-filter has minimal browser support */

// /* Inside auto layout */
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;

// /* 오늘의 술 */

// width: 366px;
// height: 33px;

// font-family: 'Yeongdeok Sea';
// font-style: normal;
// font-weight: 400;
// font-size: 26px;
// line-height: 32px;
// /* or 123% */
// text-align: center;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 1;

// /* Border bottom */

// width: 276px;
// height: 2px;

// /* Line/Dark */
// border: 3px solid #000000;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;
