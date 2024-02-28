import React from "react";
import styled from "styled-components";
import WideButton from "./WideButton";
import { useNavigate } from "react-router-dom";

const OnlyMember = () => {
  const navigate = useNavigate();
  return (
    <>
      <OnlyMemberWrapper>
        <OnlyMemberBox>
          회원만 접근 가능한 페이지 입니다.{" "}
          <WideButton onClick={() => navigate("/register")}>
            회원가입 하기
          </WideButton>
        </OnlyMemberBox>
      </OnlyMemberWrapper>
    </>
  );
};

export default OnlyMember;

const OnlyMemberWrapper = styled.div`
  box-sizing: border-box;
  font-family: "YeongdeokSea";
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 10px;
`;

const OnlyMemberBox = styled.div`
  width: 390px;
  height: 130px;
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
  gap: 30px;
`;
