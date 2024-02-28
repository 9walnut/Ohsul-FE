import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./RegisterPageStyle";
import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import { useNavigate } from "react-router";
import axios from "axios";

type RegisterFormInputs = {
  userId: string;
  userPw: string;
  pwCheck: string;
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

  //----------회원가입
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { userId, userPw, userName, userNickname } = data;
    const postData = {
      userId,
      userPw,
      userName,
      userNickname,
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
  //----------아이디 중복 확인
  const [userIdMessage, setUserIdMessage] = useState<string | null>(null);
  const checkDuplicateId = async (userId: string) => {
    try {
      const res = await axios.post(
        "/api//register/userIdCheck",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      console.log(res.data);
      setUserIdMessage(
        res.data ? "이미 사용중인 아이디입니다." : "사용가능한 아이디입니다."
      );
    } catch (error) {
      console.log("아이디 중복확인 err", error);
    }
  };
  useEffect(() => {
    const userId = watch("userId");
    if (userId.length > 0) {
      setTimeout(() => {
        checkDuplicateId(userId);
      }, 1000);
    } else {
      setUserIdMessage("");
    }
  }, [watch("userId")]);

  //----------닉네임 중복 확인
  const [userNicknameMessage, setUserNicknameMessage] = useState<string | null>(
    null
  );
  const checkDuplicateNickname = async (userNickname: string) => {
    try {
      const res = await axios.post(
        "/api//register/userNicknameCheck",
        { userNickname },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      console.log(res.data);
      setUserNicknameMessage(
        res.data ? "이미 사용중인 닉네임입니다." : "사용가능한 닉네임입니다."
      );
    } catch (error) {
      console.log("닉네임 중복확인 err", error);
    }
  };
  useEffect(() => {
    const userNickname = watch("userNickname");
    if (userNickname.length > 0) {
      setTimeout(() => {
        checkDuplicateNickname(userNickname);
      }, 1000);
    } else {
      setUserNicknameMessage("");
    }
  }, [watch("userNickname")]);

  //----------비밀번호 중복 확인
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
      <S.MyPageLayout>
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
              <S.ErrorMessage>{userIdMessage}</S.ErrorMessage>
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
              <S.ErrorMessage>{userNicknameMessage}</S.ErrorMessage>
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
      </S.MyPageLayout>
    </>
  );
};

export default RegisterPage;
