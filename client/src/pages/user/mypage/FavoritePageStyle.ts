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
