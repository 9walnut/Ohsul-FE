import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./EditMyInfoPageStyle";
import Header from "../../../components/common/Header";
import BackButton from "../../../components/common/BackButton";
import RoundButton from "../../../components/common/RoundButton";
import RoundButton02 from "../../../components/common/RoundButton02";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuthStore from "../../../stores/useAuthStore";
import ConfirmModal from "../../../components/common/ConfirmModal";

//✅ axios patch server500 error
//✅ 비밀번호 값 못가져온다. 비밀번호 변경 페이지 따로 빼야하나?

type EditMypageFormInputs = {
  userId: string;
  userPw: string;
  pwCheck: string; // 비밀번호 확인 필드는 그대로 유지
  userName: string;
  userNickname: string;
  password: string;
};

const EditMyInfoPage = () => {
  const navigate = useNavigate();
  const [userIdData, setUserIdData] = useState("");
  const [userNameData, setUserNameData] = useState("");
  const [userNicknameData, setUserNicknameData] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { userId } = useAuthStore.getState();

  useEffect(() => {
    const { userId } = useAuthStore.getState();

    const FetchData = async () => {
      try {
        const res = await axios.get("/api/mypage/info", {
          params: { userId },
        });
        if (res.status == 200) {
          console.log(res);
          setUserIdData(res.data.userId);
          setUserNameData(res.data.userName);
          setUserNicknameData(res.data.userNickname);
        }
      } catch (error) {
        console.log("fetchData err: ", error);
      }
    };

    FetchData();
  }, []);
  //----------회원 탈퇴
  const handleDelUser = () => {
    setModalOpen(true);
    console.log("탈퇴버튼클릭");
  };

  const handleDeleteConfirm = async () => {
    const logout = useAuthStore.getState().logout;

    try {
      const res = await axios.delete("/api/mypage", {
        data: {
          userId: { userId },
        },
      });
      if (res.status == 200) {
        console.log(res);
        console.log(res.data);

        logout();
        navigate("/");
      }
    } catch (error) {
      console.error("탈퇴 요청 에러:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm<EditMypageFormInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<EditMypageFormInputs> = async (data) => {
    const { userName, userNickname } = data;
    const patchData = {
      userName,
      userNickname,
    };

    console.log("내정보수정 입력", patchData);
    try {
      const res = await axios.patch("/api/mypage/info", patchData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response data", res.data); // data
      console.log("response status", res.status); // 200
      console.log("response text", res.statusText); // OK
      if (res.status == 200) {
        navigate("/mypage");
      }
    } catch (error) {
      console.log("내정보수정 err1", error);
    }
  };
  //----------비밀번호 일치 확인
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

  return (
    <>
      {modalOpen && (
        <ConfirmModal
          message="정말 탈퇴하시겠습니까?"
          onCancel={() => setShowModal(false)}
          onConfirm={handleDeleteConfirm}
          isClose={true}
        />
      )}
      <Header title="내 정보 수정" />
      <BackButton />
      <S.EditMyInfoBox>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <S.InputLayout>
            <S.StyledLabel htmlFor="id">아이디</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="text"
                id="userId"
                placeholder="아이디를 입력해주세요."
                value={userIdData}
                {...register("userId", { required: true })}
              />
            </S.InputFieldBox>
            <S.ErrorMessage>아이디는 변경 할 수 없습니다.</S.ErrorMessage>
          </S.InputLayout>
          <S.InputLayout>
            <S.StyledLabel htmlFor="pw">비밀번호</S.StyledLabel>
            <S.InputFieldBox>
              <S.StyledInput
                type="password"
                id="userPw"
                placeholder="8~20자 영문 대소문자, 숫자 조합."
                {...register("userPw", {
                  required: false,
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
                  required: false,
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
                defaultValue={userNameData}
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
                defaultValue={userNicknameData}
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
            <RoundButton type="submit">수정하기</RoundButton>
            <RoundButton02 onClick={() => navigate(-1)}>취소</RoundButton02>
          </S.ButtonBox>
          <S.DelUserBtn onClick={handleDelUser}>회원 탈퇴하기</S.DelUserBtn>
        </form>
      </S.EditMyInfoBox>
    </>
  );
};

export default EditMyInfoPage;
