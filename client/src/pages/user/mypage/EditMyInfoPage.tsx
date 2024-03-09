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
import CommonModal from "../../../components/common/CommonModal";
import OnlyMember from "../../../components/common/OnlyMember";
import useOhsulAccountStore from "../../../stores/useOhsulAccountStore";

type EditMypageFormInputs = {
  userId: string;
  userName: string;
  userNickname: string;
};

const EditMyInfoPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const { userId } = useAuthStore.getState();

  const [userIdData, setUserIdData] = useState("");
  const [userNameData, setUserNameData] = useState("");
  const [userNicknameData, setUserNicknameData] = useState("");

  //회원 정보 수정 모달
  const [editModal, setEditModal] = useState(false);
  //회원 탈퇴 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //탈퇴 불가 모달
  const [unableDelete, setUnableDelete] = useState(false);

  useEffect(() => {
    const { userId } = useAuthStore.getState();

    if (isLoggedIn) {
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
    }
  }, [isLoggedIn]);

  const handleEditOk = () => {
    // setEditModal(true)
    navigate("/mypage");
  };
  //----------회원 탈퇴
  const handleDelUser = () => {
    const ohsulId = useOhsulAccountStore.getState().ohsulId;

    if (ohsulId === userId) {
      setUnableDelete(true);
    } else {
      setModalOpen(true);
    }
    console.log("탈퇴버튼클릭");
  };

  const handleCancel = () => {
    setModalOpen(false);
    //navigate("/mypage/editMyInfo");
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
    } finally {
      setShowModal(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EditMypageFormInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<EditMypageFormInputs> = async (data) => {
    const { userName, userNickname } = data;
    const patchData = {
      userName: userName || userNameData,
      userNickname: userNickname || userNicknameData,
    };

    //console.log("내정보수정 입력", patchData);
    try {
      const res = await axios.patch("/api/mypage/info", patchData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response data", res.data); // data
      //console.log("response status", res.status); // 200
      //console.log("response text", res.statusText); // OK
      if (res.status == 200) {
        useAuthStore.setState({
          userNickname: userNickname || userNicknameData,
        });
        useAuthStore.setState({ userName: userName || userNameData });

        setEditModal(true);
      }
    } catch (error) {
      console.log("내정보수정 err1", error);
    }
  };

  //----------닉네임 중복 확인
  const [userNicknameMessage, setUserNicknameMessage] = useState<string | null>(
    null
  );
  const checkDuplicateNickname = async (userNickname: string) => {
    try {
      const res = await axios.post(
        "/api/register/userNicknameCheck",
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
    if (isLoggedIn) {
      const userNickname = watch("userNickname");
      if (userNickname.length > 0) {
        setTimeout(() => {
          checkDuplicateNickname(userNickname);
        }, 1000);
      } else {
        setUserNicknameMessage("");
      }
    }
  }, [watch("userNickname")]);

  return (
    <>
      {isLoggedIn ? (
        <>
          {editModal && (
            <CommonModal
              message="내 정보가 수정되었습니다."
              isClose={false}
              onConfirm={handleEditOk}
            />
          )}
          {modalOpen && (
            <ConfirmModal
              message="정말 탈퇴하시겠습니까?"
              onCancel={handleCancel}
              onConfirm={handleDeleteConfirm}
              isClose={true}
            />
          )}
          {unableDelete && (
            <CommonModal
              message="해당 계정은 탈퇴가 불가능합니다."
              isClose={false}
            />
          )}
          <S.EditMyPageLayout>
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
                  <S.StyledLabel htmlFor="name">이름</S.StyledLabel>
                  <S.InputFieldBox>
                    <S.StyledInput
                      type="text"
                      id="userName"
                      placeholder="이름을 입력해주세요."
                      defaultValue={userNameData}
                      {...register("userName", {
                        required: false,
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
                        required: false,
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
                  <RoundButton02 onClick={() => navigate("/mypage/pwCheck")}>
                    비밀번호 변경
                  </RoundButton02>
                </S.ButtonBox>
                <S.DelUserBtn onClick={handleDelUser}>
                  회원 탈퇴하기
                </S.DelUserBtn>
              </form>
            </S.EditMyInfoBox>
          </S.EditMyPageLayout>
        </>
      ) : (
        <>
          <OnlyMember></OnlyMember>
        </>
      )}
    </>
  );
};

export default EditMyInfoPage;
