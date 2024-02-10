import React from "react";
import Header from "../../../components/common/Header";
import RoundButton from "../../../components/common/RoundButton";
import WideButton from "../../../components/common/WideButton";

const LoginPage: React.FC = () => {
  const handleClick = () => {
    console.log("버튼 클릭");
  };

  return (
    <>
      <Header title="로그인" />
      <RoundButton onClick={handleClick}>버튼</RoundButton>
      <div> 버튼</div>
      <WideButton onClick={handleClick}>와이드버튼</WideButton>
    </>
  );
};

export default LoginPage;
