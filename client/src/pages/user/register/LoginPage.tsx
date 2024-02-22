import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./LoginPageStyle";
import { useNavigate } from "react-router";
import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import axios from "axios";
import Cookies from "universal-cookie";

type LoginFormInputs = {
  userId: string;
  userPw: string;
};

const LoginPage = (props: any) => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // 로그인
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("로그인 입력:", data);
    try {
      const res = await axios.post("api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // 세션 쿠키를 서버에서 받아와서 저장
      const sessionId = "receivedSessionId"; // 서버에서 받아온 JSESSIONID 값
      cookies.set("sessionId", sessionId, { path: "/" });
      // 로그인 상태를 저장
      cookies.set("isLoggedIn", true, { path: "/" });
      // const userId = res.data.userId;
      // console.log(userId);
      // localStorage.setItem("userId", userId);

      // console.log("로그인 응답", res);
      // console.log("response status", res.status);
      // console.log("로그인 응답 res.data", res.data);
      // console.log("로그인 응답 res.data.userId", res.data.userId);
      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("userId", res.data.userId);
      // localStorage.setItem("isLoggedIn", "true");
      // localStorage.setItem("key1", JSON.stringify({ key1: "10" }));
      // localStorage.setItem("key2", JSON.stringify({ key2: "userId" }));

      // console.log(localStorage.getItem("userId"));
      // console.log(localStorage.getItem("token"));
      // console.log(localStorage.getItem("isLoggedIn"));
      if (res.status == 200) {
        // localStorage.setItem("isLogin", "true");
        // localStorage.setItem("userId", res.data.userId
        // );

        navigate("/");
      }
    } catch (error) {
      const res = await axios.post("/api/login", data);
      console.log("로그인 응답22", res);
      console.log("로그인 err", error);
    }
  };

  return (
    <>
      <Header title="로그인" />
      <BackButton />
      <S.LoginBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.InputLayout>
            <S.StyledLabel>아이디</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="text"
                id="userId"
                placeholder="아이디를 입력해주세요."
                {...register("userId", { required: true })}
              />
            </S.InputFieldBox>
            {errors.userId && (
              <S.ErrorMessage>아이디를 입력해주세요.</S.ErrorMessage>
            )}
          </S.InputLayout>
          <S.InputLayout>
            <S.StyledLabel>비밀번호</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="password"
                placeholder="8~20자 영문 숫자 조합."
                {...register("userPw", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/,
                })}
              />
            </S.InputFieldBox>
            {errors.userPw?.type === "required" && (
              <S.ErrorMessage>비밀번호를 입력해주세요.</S.ErrorMessage>
            )}
            {errors.userPw?.type === "minLength" && (
              <S.ErrorMessage>
                비밀번호는 최소 8자 이상이어야 합니다.
              </S.ErrorMessage>
            )}
            {errors.userPw?.type === "maxLength" && (
              <S.ErrorMessage>
                비밀번호는 최대 20자 이하여야 합니다.
              </S.ErrorMessage>
            )}
            {errors.userPw?.type === "pattern" && (
              <S.ErrorMessage>
                비밀번호는 영문과 숫자의 조합이어야 합니다.
              </S.ErrorMessage>
            )}
          </S.InputLayout>
          <S.ButtonBox>
            <RoundButton type="submit">로그인</RoundButton>
          </S.ButtonBox>
        </form>
        <S.StyledLink to="/register">회원가입</S.StyledLink>
      </S.LoginBox>
    </>
  );
};

export default LoginPage;
