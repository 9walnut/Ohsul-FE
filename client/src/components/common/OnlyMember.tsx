import React from "react";
import styled from "styled-components";
import WideButton from "./WideButton";
import { useNavigate } from "react-router-dom";

const OnlyMember = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <OnlyMemberWrapper>
        <OnlyMemberBox>
          회원만 접근 가능한 페이지 입니다.{" "}
          <ButtonWrapper>
            <WideButton onClick={handleRegister}>회원가입 하기</WideButton>
            <WideButton onClick={handleLogin}>로그인 하기</WideButton>
          </ButtonWrapper>
        </OnlyMemberBox>
      </OnlyMemberWrapper>
    </>
  );
};

export default OnlyMember;

const OnlyMemberWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
`;

const OnlyMemberBox = styled.div`
  width: 390px;
  background-color: ${({ theme }) => theme.colors.bgLightColor};
  border: 1px solid ${({ theme }) => theme.colors.iconBlue};
  color: ${({ theme }) => theme.colors.blueFont};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
  gap: 20px;
  padding: 20px 0px 5px 0px;
`;
const ButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
  gap: 7px;
`;
