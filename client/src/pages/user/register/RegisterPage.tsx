import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./RegisterPageStyle";
import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import { useNavigate } from "react-router";
import axios from "axios";

//✅ 아이디 닉네임 중복확인
type RegisterFormInputs = {
  userId: string;
  userPw: string;
  pwCheck: string; // 비밀번호 확인 필드는 그대로 유지
  userName: string;
  userNickname: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
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
    const { userId, userPw, userName, userNickname } = data;
    const postData = {
      userId,
      userPw, // 변경됨
      userName, // 변경됨
      userNickname, // 변경됨
    };

    console.log("회원가입 입력", postData);
    try {
      const res = await axios.post("/api/register", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response data", res.data); // data
      console.log("response status", res.status); // 200
      console.log("response text", res.statusText); // OK
      if (res.status == 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("회원가입 err1", error);
    }
  };

  useEffect(() => {
    const passwordWatch = watch("userPw");
    const pwCheckWatch = watch("pwCheck");
    if (passwordWatch !== pwCheckWatch && pwCheckWatch) {
      setError("pwCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      clearErrors("pwCheck");
    }
  }, [watch("userPw"), watch("pwCheck"), setError, clearErrors]);

  return (
    <>
      <Header title="회원가입" />
      <BackButton />
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
                id="userPw"
                placeholder="8~20자 영문 대소문자, 숫자 조합."
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
                비밀번호는 최소 8자 이상 영문과 숫자의 조합이여야 합니다.
              </S.ErrorMessage>
            )}
            {errors.userPw?.type === "maxLength" && (
              <S.ErrorMessage>
                비밀번호는 20자 이하 영문과 숫자의 조합이여야 합니다.
              </S.ErrorMessage>
            )}
            {errors.userPw?.type === "pattern" && (
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
                    value === getValues("userPw") ||
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
                id="userName"
                placeholder="이름을 입력해주세요."
                {...register("userName", {
                  required: true,
                  minLength: 2,
                })}
              />
            </S.InputFieldBox>
            {errors.userName?.type === "required" && (
              <S.ErrorMessage>이름을 입력해주세요.</S.ErrorMessage>
            )}
            {errors.userName?.type === "minLength" && (
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
                id="userNickname"
                placeholder="사용하실 닉네임을 입력해주세요."
                {...register("userNickname", {
                  required: true,
                  minLength: 2,
                })}
              />
            </S.InputFieldBox>
            {errors.userNickname?.type === "required" && (
              <S.ErrorMessage>닉네임을 입력해주세요.</S.ErrorMessage>
            )}
            {errors.userNickname?.type === "minLength" && (
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
