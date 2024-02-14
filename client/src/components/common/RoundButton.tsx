import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type: "submit";
}
const RoundButton: React.FC<ButtonProps> = ({ onClick, children, type }) => {
  return (
    <Button onClick={onClick} type={type}>
      {children}
    </Button>
  );
};

export default RoundButton;

const Button = styled.button`
  width: 146px;
  height: 36px;

  background: ${({ theme }) => theme.colors.btnBlue};
  border-radius: 100px;
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
