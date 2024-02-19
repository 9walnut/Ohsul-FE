import React, { useState } from "react";

import * as S from "./MyPageStyle";

import Header from "../../../components/common/Header";
import MenuBar from "../../../components/myPage/MenuBar";
import FavoritePage from "./FavoritePage";
import MyReviewPage from "./MyReviewPage";

//DUMMY
const userNickname = "졸린공룡";

//렌더링 될 컴포넌트 지정
type ComponentType = "favorite" | "myreview";

const MyPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<ComponentType>("favorite");

  const renderPage = () => {
    switch (selectedPage) {
      case "favorite":
        return <FavoritePage />;
      case "myreview":
        return <MyReviewPage />;
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
          <S.StyledLink to="/register">내 정보 수정</S.StyledLink>
          <S.StyledLink to="/register">로그아웃</S.StyledLink>
        </S.UserBox>
      </S.MyInfoBox>
      <MenuBar setSelectedPage={setSelectedPage} />
      {renderPage()}
    </>
  );
};

export default MyPage;
