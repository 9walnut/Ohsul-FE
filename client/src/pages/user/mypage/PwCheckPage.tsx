import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./PwCheckPageStyle";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";

import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import OnlyMember from "../../../components/common/OnlyMember";

type PwCheckInputs = {
  userPw: string;
};

const PwCheckPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PwCheckInputs>();

  const onSubmit: SubmitHandler<PwCheckInputs> = async (data) => {
    console.log("비밀번호 입력:", data);
    try {
      const res = await axios.post("/api/mypage/info/userPwCheck", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        console.log(res);
        console.log(res.data);
        navigate("/mypage/pwChange");
      }
    } catch (error) {
      console.log("비밀번호 확인 err", error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <S.PwCheckPageLayout>
            <Header title="비밀번호 확인" />
            <BackButton />

            <S.PwCheckBox>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <RoundButton type="submit">확인</RoundButton>
                </S.ButtonBox>
              </form>
            </S.PwCheckBox>
          </S.PwCheckPageLayout>
        </>
      ) : (
        <>
          <OnlyMember></OnlyMember>
        </>
      )}
    </>
  );
};

export default PwCheckPage;
