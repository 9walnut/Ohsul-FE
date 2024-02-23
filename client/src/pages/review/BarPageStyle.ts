import styled from "styled-components";

export const ImgUploadWrapper = styled.div``;

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
  width: 100px;
  height: 100px;
  img {
    width: 100%;
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
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid #4d607b;
  border-radius: 12px;
  outline: none;
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
