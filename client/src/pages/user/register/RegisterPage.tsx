import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as S from "./RegisterPageStyle";

import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import axios from "axios";

type RegisterFormInputs = {
  userId: string;
  password: string;
  pwCheck: string;
  name: string;
  nickName: string;
};

const RegisterPage = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm<RegisterFormInputs>({ mode: "onChange" });

  // 회원가입
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    console.log("회원가입 입력", data);
    try {
      const res = await axios.post("api/register", data);
      console.log("회원가입 응답", res);
      const res2 = await axios.post("/api/register", data);
      console.log("회원가입 응답", res2);
    } catch (error) {
      const res = await axios.post("/register", data);
      console.log("회원가입 err1", error);
    }
  };

  useEffect(() => {
    const passwordWatch = watch("password");
    const pwCheckWatch = watch("pwCheck");
    if (passwordWatch !== pwCheckWatch && pwCheckWatch) {
      setError("pwCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      clearErrors("pwCheck");
    }
  }, [watch("password"), watch("pwCheck"), setError, clearErrors]);

  return (
    <>
      <Header title="회원가입" />
      <BackButton />
      변경3
      <S.RegisterBox>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <S.InputLayout>
            <S.StyledLabel htmlFor="id">아이디</S.StyledLabel>
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
            <S.StyledLabel htmlFor="pw">비밀번호</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="password"
                id="password"
                placeholder="8~20자 영문 대소문자, 숫자 조합."
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
                비밀번호는 최소 8자 이상 영문과 숫자의 조합이여야 합니다.
              </S.ErrorMessage>
            )}
            {errors.password?.type === "maxLength" && (
              <S.ErrorMessage>
                비밀번호는 20자 이하 영문과 숫자의 조합이여야 합니다.
              </S.ErrorMessage>
            )}
            {errors.password?.type === "pattern" && (
              <S.ErrorMessage>
                비밀번호는 영문과 숫자의 조합이어야 합니다.
              </S.ErrorMessage>
            )}
          </S.InputLayout>

          <S.InputLayout>
            <S.StyledLabel htmlFor="pwCheck">비밀번호 확인</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="password"
                id="pwCheck"
                placeholder="비밀번호를 확인해주세요."
                {...register("pwCheck", {
                  required: true,
                  // validate: {
                  //   matchPassword: (value) => {
                  //     // const { password } = getValues();
                  //     return (
                  //       value === getValues("password") ||
                  //       "비밀번호가 일치하지 않습니다"
                  //     );
                  //   },
                  // },
                  validate: (value) =>
                    value === getValues("password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />
            </S.InputFieldBox>
            {errors.pwCheck?.type === "required" && (
              <S.ErrorMessage>비밀번호를 확인해주세요.</S.ErrorMessage>
            )}
            {errors.pwCheck?.type === "validate" && (
              <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
            )}
          </S.InputLayout>
          <S.InputLayout>
            <S.StyledLabel htmlFor="name">이름</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="text"
                id="name"
                placeholder="이름을 입력해주세요."
                {...register("name", {
                  required: true,
                  minLength: 2,
                })}
              />
            </S.InputFieldBox>
            {errors.name?.type === "required" && (
              <S.ErrorMessage>이름을 입력해주세요.</S.ErrorMessage>
            )}
            {errors.name?.type === "minLength" && (
              <S.ErrorMessage>
                이름은 최소 2글자 이상으로 작성해주세요.
              </S.ErrorMessage>
            )}
          </S.InputLayout>
          <S.InputLayout>
            <S.StyledLabel htmlFor="nickName">닉네임</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="text"
                id="nickName"
                placeholder="사용하실 닉네임을 입력해주세요."
                {...register("nickName", {
                  required: true,
                  minLength: 2,
                })}
              />
            </S.InputFieldBox>
            {errors.nickName?.type === "required" && (
              <S.ErrorMessage>닉네임을 입력해주세요.</S.ErrorMessage>
            )}
            {errors.nickName?.type === "minLength" && (
              <S.ErrorMessage>
                닉네임은 최소 2글자 이상으로 작성해주세요.
              </S.ErrorMessage>
            )}
          </S.InputLayout>
          <S.ButtonBox>
            <RoundButton type="submit">회원가입</RoundButton>
          </S.ButtonBox>
        </form>
      </S.RegisterBox>
    </>
  );
};

export default RegisterPage;
