import React from "react";
import styled from "styled-components";
import { FadeLoader } from "react-spinners";

const MapLoading = () => {
  return (
    <MapLoadingWrap>
      <LoadingBox>
        <FadeLoader color="#4D607B" />
      </LoadingBox>
      <TextBox>
        <div className="textTop"> 지도 정보를 가져오고 있어요. 🍺 </div>
      </TextBox>
    </MapLoadingWrap>
  );
};

export default MapLoading;

const MapLoadingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  color: ${({ theme }) => theme.colors.blueFont};

  img {
    width: 100%;
    height: auto;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 130px;
`;

const TextBox = styled.div`
  width: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
