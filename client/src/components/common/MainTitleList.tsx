import React from "react";
import styled from "styled-components";

import { MainTitle } from "../../types/Common";

const MainTitleList: React.FC<MainTitle> = ({ title, icon }) => {
  return (
    <>
      <MainTitleLayout>
        <TitleBox>
          <IconBox>
            <img src={icon} alt={icon} />
          </IconBox>
          <TitleParagraph>{title}</TitleParagraph>
        </TitleBox>
      </MainTitleLayout>
    </>
  );
};

export default MainTitleList;

const MainTitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0px;
  gap: 10px;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 8px 3px 16px;
  gap: 12px;

  width: 100%;
  height: 55px;
`;

const TitleParagraph = styled.div`
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
`;

const IconBox = styled.div`
  width: 16px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
