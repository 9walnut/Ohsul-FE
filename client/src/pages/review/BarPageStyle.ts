import styled from "styled-components";

export const ReviewPageLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 78px;
`;

export const ImgUploadWrapper = styled.div`
  margin: 24px 0px;
`;

export const ImgUploadBtn = styled.button`
  padding: 4px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.btnBlue};
  color: ${({ theme }) => theme.colors.lightFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;

export const ImgBox = styled.div`
  margin-bottom: 12px;
  width: 150px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const InputBoxWrapper = styled.div`
  margin-bottom: 12px;
  width: 100%;
`;

export const InputBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 6px;
`;

export const ExplainInput = styled.div`
  text-align: left;
  width: 20%;
`;

export const StyledInput = styled.input`
  width: 80%;
  border: none;
  border-radius: 100px;
  padding: 8px 12px;
  font-size: 12px;
`;

export const ExplainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.btnBlue};
  color: ${({ theme }) => theme.colors.lightFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-size: 14px;
  border-radius: 4px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const ContentBox = styled.input`
  width: 100%;
  /* max-width: 430px; */
  height: 60px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid #4d607b;
  border-radius: 12px;
  outline: none;
  margin-bottom: 12px;

  &::placeholder {
    text-align: center;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.btnBlue};
  color: ${({ theme }) => theme.colors.lightFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  outline: none;
  border: none;
  border-radius: 12px;
`;

export const NoReviewBox = styled.div`
  width: 100%;
  width: 100%;
  height: 90px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.bgLightColor};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.darkFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
`;
