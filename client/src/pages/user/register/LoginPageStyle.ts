import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginPageLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 78px;
`;
export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  gap: 10px;

  height: 100%;
  position: relative;
  justify-content: center;
  justify-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.greyFont};
`;

export const ButtonBox = styled.div`
  margin-top: 60px;
`;

export const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  margin-bottom: 40px;
`;

export const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 12px;
`;

export const InputFieldBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px;
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
