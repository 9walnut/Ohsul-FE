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
    <ToggleLayout>
      <BtnWrapper>
        <CheckBox type="checkbox" id="toggleBtn" onChange={toggleHandler} />
        <ButtonLabel htmlFor="toggleBtn" viewMap={viewMap}></ButtonLabel>
      </BtnWrapper>
    </ToggleLayout>
  );
};

export default Toggle2;

const ToggleLayout = styled.div`
  width: 100%;
`;
const BtnWrapper = styled.div`
  display: flex;
  z-index: 0;
  width: 100%;
  margin-left: 17px;
`;

const CheckBox = styled.input`
  display: none;
`;

const ButtonLabel = styled.label<ToggleProps>`
  z-index: 10;
  width: 50%;
  height: 45px;
  border-radius: 100px;
  background-color: ${({ viewMap, theme }) =>
    viewMap ? theme.colors.blueFont : theme.colors.bgColor};
  color: ${({ viewMap, theme }) =>
    viewMap ? theme.colors.lightFont : theme.colors.blueFont};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.blueFont};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &::before {
    display: flex;
    position: absolute;
    content: "지도 보기";
    font-family: ${({ theme }) => theme.fonts.ydFont};
    justify-content: flex-start;
    align-items: center;
    height: 45px;
    font-weight: lighter;
    transition: all 0.2s ease-in-out;
  }
  &::after {
    display: flex;
    position: relative;
    content: "리스트 보기";
    font-family: ${({ theme }) => theme.fonts.ydFont};
    border: 1px solid ${({ theme }) => theme.colors.blueFont};
    width: 200px;
    height: 43px;
    justify-content: center;
    align-items: center;
    left: 160px;
    font-weight: bolder;
    border-radius: 100px;
    background-color: ${({ viewMap, theme }) =>
      viewMap ? "" : theme.colors.blueFont};
    color: ${({ viewMap, theme }) =>
      viewMap ? theme.colors.blueFont : theme.colors.lightFont};
    transition: all 0.2s ease-in-out;
  }
`;
