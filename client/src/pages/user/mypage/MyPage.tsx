import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

import * as S from "./MyPageStyle";

import Header from "../../../components/common/Header";
import MenuBar from "../../../components/myPage/MenuBar";
import FavoritePage from "./FavoritePage";
import MyReviewPage from "./MyReviewPage";
import CommonModal from "../../../components/common/CommonModal";
import useAuthStore from "../../../stores/useAuthStore";
import OnlyMember from "../../../components/common/OnlyMember";

//렌더링 될 컴포넌트 지정
type ComponentType = "favorite" | "myreview";

const MyPage: React.FC = () => {
  const cookies = new Cookies();
  const [isLoggedInCookie, setIsLoggedInCookie] = useState(false);
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<ComponentType>("favorite");
  const { userNickname } = useAuthStore.getState();
  console.log(userNickname);
  const [modalOpen, setModalOpen] = useState(false);

  const renderPage = () => {
    switch (selectedPage) {
      case "favorite":
        return <FavoritePage />;
      case "myreview":
        return <MyReviewPage />;
    }
  };

  const handleLogout = async () => {
    const logout = useAuthStore.getState().logout;

    try {
      const res = await axios.post("api/logout");

      if (res.status == 200) {
        console.log(res);
        cookies.set("isLoggedIn", false, { path: "/" });
        //console.log("isLoggedIn?: ", cookies.get("isLoggedIn"));

        //--- zustand Logout
        logout();
        console.log(
          "zustand isLoggedIn Logout?:",
          useAuthStore.getState().isLoggedIn
        );

        //--- cookie Logout
        setIsLoggedInCookie(false);

        //open modal
        setModalOpen(true);
      }
    } catch (error) {
      console.log("로그아웃err", error);
    }
  };

  const handleConfirm = () => {
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <S.MyPageLayout>
            <Header title="마이페이지" />
            <S.MyInfoBox>
              <S.MsgBox>
                <S.Msg1>안녕하세요 {userNickname}님!</S.Msg1>
                <S.Msg2>오늘도 한 잔 하실까요? 🍻 </S.Msg2>
              </S.MsgBox>
              {modalOpen && (
                <CommonModal
                  message={
                    <>
                      로그아웃 되었습니다. <br /> 오늘은 한 잔 쉬고 내일 다시
                      달려요!🍻
                    </>
                  }
                  isClose={true}
                  onConfirm={handleConfirm}
                />
              )}

              <S.UserBox>
                <S.StyledLink to="/mypage/editMyInfo">
                  내 정보 수정
                </S.StyledLink>
                <S.LogoutBtn onClick={handleLogout}>로그아웃</S.LogoutBtn>
              </S.UserBox>
            </S.MyInfoBox>
            <MenuBar
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            {renderPage()}
          </S.MyPageLayout>
        </>
      ) : (
        <>
          <OnlyMember></OnlyMember>
        </>
      )}
    </>
  );
};

export default MyPage;
