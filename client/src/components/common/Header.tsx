import React from "react";
import styled from "styled-components";

import { HeaderTitle } from "../../types/Common";

const Header: React.FC<HeaderTitle> = ({ title }) => {
  return (
    <>
      <HeaderLayout>
        <TitleBox>
          <TitleParagraph>{title}</TitleParagraph>
          <BorderBottom>
            <img src="/assets/images/header_line.png" alt="header" />
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
  /* height: 63px;
  left: 0px;
  right: 0px;
  top: 44px; */
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px 12px 16px;
  gap: 4px;

  width: 100%;
  height: 55px;
`;

const TitleParagraph = styled.div`
  font-family: ${({ theme }) => theme.fonts.ydFont};
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
