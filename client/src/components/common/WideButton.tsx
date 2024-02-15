import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
const WideButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default WideButton;

const Button = styled.button`
  /* width: 343px; */
  width: 90%;
  /* height: 46px; */
  padding: 4px;

  background: ${({ theme }) => theme.colors.btnBlue};
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
`;
