import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

import * as S from "./MyPageStyle";

import Header from "../../../components/common/Header";
import MenuBar from "../../../components/myPage/MenuBar";
import FavoritePage from "./FavoritePage";
import MyReviewPage from "./MyReviewPage";
import ConfirmModal from "../../../components/common/ConfirmModal";
import useAuthStore from "../../../stores/useAuthStore";

//const userNickname = useAuthStore.getState().userNickname;
//const userNickname = useAuthStore((state) => state.userNickname);
//const { userNickname } = useAuthStore.getState();

//렌더링 될 컴포넌트 지정
type ComponentType = "favorite" | "myreview";

const MyPage: React.FC = () => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<ComponentType>("favorite");
  const { userNickname } = useAuthStore.getState();
  // useEffect(() => {
  //   useAuthStore.getState().userNickname;
  // }, []);

  const renderPage = () => {
    switch (selectedPage) {
      case "favorite":
        return <FavoritePage />;
      case "myreview":
        return <MyReviewPage />;
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("api/logout");
      // <ConfirmModal message="로그아웃 완료" isClose={true} />;
      if (res.status == 200) {
        console.log(res);
        cookies.set("isLoggedIn", false, { path: "/" });
        //console.log("isLoggedIn?: ", cookies.get("isLoggedIn"));

        //--- zustand Logout
        useAuthStore.setState({ isLoggedIn: false });
        console.log(
          "zustand isLoggedIn Logout?:",
          useAuthStore.getState().isLoggedIn
        );
        //--- cookie Logout
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log("로그아웃err", error);
    }
  };
  return (
    <>
      <Header title="마이페이지" />
      <S.MyInfoBox>
        <S.MsgBox>
          <S.Msg1>안녕하세요 {userNickname}님!</S.Msg1>
          <S.Msg2>오늘도 한 잔 하실까요? 🍻 </S.Msg2>
        </S.MsgBox>
        <S.UserBox>
          <S.StyledLink to="/mypage/editMyInfo">내 정보 수정</S.StyledLink>
          <S.LogoutBtn onClick={handleLogout}>로그아웃</S.LogoutBtn>
        </S.UserBox>
      </S.MyInfoBox>
      <MenuBar setSelectedPage={setSelectedPage} />
      {renderPage()}
    </>
  );
};

export default MyPage;
