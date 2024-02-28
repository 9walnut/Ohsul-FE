import styled from "styled-components";

export const MyReviewPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  gap: 4px;

  /* position: absolute; */

  width: 100%;
  top: 35%;

  //background-color: bisque;
`;

export const ReviewCount = styled.div`
  /* width: 390px; */
  width: 100%;
  height: 18px;
  left: 0px;
  text-align: left;
  margin: 5px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  //background-color: rebeccapurple;
`;

export const NoReviewBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 90px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.bgLightColor};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.darkFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;
