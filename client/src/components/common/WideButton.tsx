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
  width: 343px;
  height: 46px;

  /* position: absolute; */
  left: 1.5px;
  right: 1.5px;
  top: 0%;
  bottom: 44.62%;

  background: #4d607b;
  border-radius: 100px;
  border: none;
  outline: none;
  cursor: pointer;

  font-family: "Yeongdeok Sea";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
`;
