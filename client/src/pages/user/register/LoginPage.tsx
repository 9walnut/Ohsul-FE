import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./LoginPageStyle";
import { useNavigate } from "react-router";
import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import axios from "axios";
import Cookies from "universal-cookie";
import useAuthStore from "../../../stores/useAuthStore";
import CommonModal from "../../../components/common/CommonModal";
import useOhsulAccountStore from "../../../stores/useOhsulAccountStore";

type LoginFormInputs = {
  userId: string;
  userPw: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [modalOpen, setModalOpen] = useState(false);
  const [ohsulId, setOhsulId] = useState(
    useOhsulAccountStore.getState().ohsulId
  );
  const [ohsulPw, setOhsulPw] = useState(
    useOhsulAccountStore.getState().ohsulPw
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // 로그인
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("로그인 입력:", data);
    try {
      const res = await axios.post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        //console.log(res);
        console.log(res.data);

        const sessionId = "receivedSessionId";
        cookies.set("sessionId", sessionId, { path: "/" });
        cookies.set("isLoggedIn", true, { path: "/" });

        useAuthStore.setState({
          isLoggedIn: true,
          userId: res.data.userId,
          userName: res.data.userName,
          userNumber: res.data.userNumber,
          userNickname: res.data.userNickname,
        });

        navigate("/");
      }
    } catch (error) {
      console.log("로그인 err", error);
      setModalOpen(true);
    }
  };
  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/login");
  };
  return (
    <>
      {modalOpen && (
        <CommonModal
          message="아이디와 비밀번호를 확인해주세요."
          isClose={true}
          onConfirm={handleConfirm}
        />
      )}
      <S.LoginPageLayout>
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
                  defaultValue={ohsulId}
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
                  defaultValue={ohsulPw}
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
      </S.LoginPageLayout>
    </>
  );
};

export default LoginPage;
