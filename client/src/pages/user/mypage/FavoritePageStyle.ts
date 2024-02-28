import styled from "styled-components";

export const FavoritePageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  gap: 4px;
  width: 100%;
`;

export const FavoriteCount = styled.div`
  width: 100%;
  height: 18px;
  left: 0px;
  text-align: left;
  margin: 5px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;

export const NoFavoritePlaceBox = styled.div`
  width: 80%;
  position: absolute;
  top: 35%;
  background-color: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid ${({ theme }) => theme.colors.blueFont};
  padding: 4px 10px 15px 10px;
  border-radius: 15px;
`;
export const MessageBox = styled.div`
  padding: 20px;
  font-size: 14px;
  line-height: 16px;
`;
