import styled from "styled-components";

export const MyPageLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 78px;
`;
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
  text-align: left;
  margin: 5px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;

export const NoFavoritePlaceBox = styled.div`
  cursor: pointer;
  width: 85%;
  position: absolute;
  top: 44%;
  border: 1px solid ${({ theme }) => theme.colors.blueFont};
  background-color: ${({ theme }) => theme.colors.bgLightColor};
  padding: 4px 10px;
  border-radius: 15px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
export const MessageBox = styled.div`
  padding: 20px;
  font-size: 14px;
  line-height: 25px;
  &:hover {
    color: ${({ theme }) => theme.colors.lightFont};
  }
`;
