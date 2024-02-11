import React, { useState } from "react";
import Header from "../../../components/common/Header";
import RoundButton from "../../../components/common/RoundButton";
import WideButton from "../../../components/common/WideButton";
import InputFieldText from "../../../components/common/InputFieldText";

const LoginPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    console.log("버튼 클릭");
  };

  const handleChange = (value: string) => {
    console.log("입력값: ", value);
    setInputValue(value);
  };

  return (
    <>
      <Header title="로그인" />
      <RoundButton onClick={handleClick}>버튼</RoundButton>
      <div> 버튼</div>
      <WideButton onClick={handleClick}>와이드버튼</WideButton>
      <InputFieldText
        name="id"
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요."
        value={inputValue}
        onChange={handleChange}
      ></InputFieldText>
    </>
  );
};

export default LoginPage;
