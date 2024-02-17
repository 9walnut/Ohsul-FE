import React, { useState } from "react";
import styled from "styled-components";

const MapToggle: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

  return (
    <Button toggled={isToggled} onClick={toggleButton}>
      {isToggled ? "ON" : "OFF"}
    </Button>
  );
};

const Button = styled.button<{ toggled: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.toggled ? "green" : "grey")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export default MapToggle;
