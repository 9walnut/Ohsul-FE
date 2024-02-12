import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as S from "./LoginPageStyle";

import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";

type LoginFormInputs = {
  username: string;
  password: string;
};
const LoginPage = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("로그인 입력:", data);
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
                id="id"
                {...register("username", { required: true })}
              />
            </S.InputFieldBox>
            {errors.username && (
              <S.ErrorMessage>아이디를 입력해주세요.</S.ErrorMessage>
            )}
          </S.InputLayout>
          <S.InputLayout>
            <S.StyledLabel>비밀번호</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/,
                })}
              />
            </S.InputFieldBox>
            {errors.password?.type === "required" && (
              <S.ErrorMessage>비밀번호를 입력해주세요.</S.ErrorMessage>
            )}
            {errors.password?.type === "minLength" && (
              <S.ErrorMessage>
                비밀번호는 최소 8자 이상이어야 합니다.
              </S.ErrorMessage>
            )}
            {errors.password?.type === "maxLength" && (
              <S.ErrorMessage>
                비밀번호는 최대 20자 이하여야 합니다.
              </S.ErrorMessage>
            )}
            {errors.password?.type === "pattern" && (
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
