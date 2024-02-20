import styled from "styled-components";
import { Link } from "react-router-dom";

export const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  gap: 10px;
  margin-top: 50px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 10px;
  color: #6f6f6f;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 60px;
`;

export const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 343px;
  height: 57px;
  margin-bottom: 40px;
`;

export const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 12px;
`;

// 중복 확인 버튼 ui
export const CheckBtn = styled.button`
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.btnBlue};
  color: ${({ theme }) => theme.colors.lightFont};
  font-family: ${({ theme }) => theme.fonts.ydFont};
  border-radius: 15px;
  cursor: pointer;
`;

export const InputFieldBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 7px;
  width: 222px;
  height: 29px;
  background: ${({ theme }) => theme.colors.bgLightColor};
  border-radius: 50px;
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 222px;
  height: 29px;
  background-color: transparent;
  &::placeholder {
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.blueFont};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.blueFont};
  font-size: 11px;
`;
