import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ButtonLayout>
      <StyledButton onClick={() => navigate(-1)}>
        <img
          src={process.env.PUBLIC_URL + "assets/images/common_backArrow.png"}
          alt="뒤로가기"
        />
      </StyledButton>
    </ButtonLayout>
  );
};

export default BackButton;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 36px;

  position: absolute;
  height: 22.78px;
  left: 0px;
  right: 0px;
  top: 109px;
`;

const StyledButton = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
