import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import InputFieldText from "../../../components/common/InputFieldText";

// ⭐️ 리액트 훅 폼 변경.....
// ⭐️ 페이지 레이아웃

const LoginPage: React.FC = () => {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");

  const handleClick = () => {
    console.log("버튼 클릭");
  };

  const handleIdChange = (value: string) => {
    console.log("아이디 입력값: ", value);
    setIdValue(value);
  };

  const handlePwChange = (value: string) => {
    console.log("비밀번호 입력값: ", value);
    setPwValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit 버튼 클릭");
  };

  return (
    <>
      <Header title="로그인" />
      <BackButton />
      <LoginBox>
        <form onSubmit={handleSubmit}>
          <InputFieldText
            name="id"
            id="id"
            type="text"
            placeholder="아이디를 입력해주세요."
            value={idValue}
            onChange={handleIdChange}
          >
            아이디
          </InputFieldText>
          <InputFieldText
            name="pw"
            id="pw"
            type="password"
            placeholder="8~20자 영문 숫자 조합."
            value={pwValue}
            onChange={handlePwChange}
          >
            비밀번호
          </InputFieldText>
          <RoundButton type="submit" onClick={handleClick}>
            로그인
          </RoundButton>
        </form>
        {/* <Link to="/register" style={{ textDecoration: "none" }}> */}
        <StyledLink to="/register">회원가입</StyledLink>
      </LoginBox>
    </>
  );
};

export default LoginPage;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  gap: 60px;

  position: absolute;
  width: 383px;
  height: 252px;
  left: 3px;
  top: 221px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 10px;
  color: #6f6f6f;
`;
