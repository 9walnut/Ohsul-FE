import styled from "styled-components";

export const InputBoxWrapper = styled.div`
  margin-bottom: 4px;
  width: 100%;
`;

export const InputBox = styled.div`
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 50%;
  border: none;
  padding: 4px;
`;
export const ExplainBox = styled.div`
  width: 100%;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.btnBlue};
  color: ${({ theme }) => theme.colors.lightFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-size: 14px;
  border-radius: 4px;
`;
