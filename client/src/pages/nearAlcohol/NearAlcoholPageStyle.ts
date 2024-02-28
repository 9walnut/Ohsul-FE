import styled from "styled-components";

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
