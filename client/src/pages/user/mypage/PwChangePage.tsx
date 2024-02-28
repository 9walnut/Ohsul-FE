import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./PwChangePageStyle";
import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import RoundButton02 from "../../../components/common/RoundButton02";
import { useNavigate } from "react-router";
import CommonModal from "../../../components/common/CommonModal";
import axios from "axios";
import OnlyMember from "../../../components/common/OnlyMember";
import useAuthStore from "../../../stores/useAuthStore";

type PwChangeFormInputs = {
  userPw: string;
  pwCheck: string;
};

const PwChangePage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm<PwChangeFormInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<PwChangeFormInputs> = async (data) => {
    const { userPw } = data;
    const postData = {
      userPw,
    };

    console.log("비밀번호 변경 입력", postData);
    try {
      const res = await axios.patch("/api/mypage/info/userPwEdit", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response data", res.data); // data
      console.log("response status", res.status); // 200
      console.log("response text", res.statusText); // OK
      if (res.status == 200) {
        setModalOpen(true);
      }
    } catch (error) {
      console.log("비밀번호 변경 err1", error);
    }
  };

  const handleConfirm = () => {
    navigate("/mypage");
  };

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
      {isLoggedIn ? (
        <>
          <Header title="비밀번호 변경" />
          <BackButton />
          {modalOpen && (
            <CommonModal
              message="비밀번호가 변경되었습니다."
              isClose={true}
              onConfirm={handleConfirm}
            />
          )}
          <S.PwChangeBox>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
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

              <S.ButtonBox>
                <RoundButton type="submit">변경하기</RoundButton>
                <RoundButton02 onClick={() => navigate("/mypage")}>
                  취소
                </RoundButton02>
              </S.ButtonBox>
            </form>
          </S.PwChangeBox>
        </>
      ) : (
        <>
          <OnlyMember></OnlyMember>
        </>
      )}
    </>
  );
};

export default PwChangePage;
