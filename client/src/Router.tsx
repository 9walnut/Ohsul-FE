import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import App from "./App";
import SearchAlcoholPage from "./pages/searchAlcohol/SearchAlcoholPage";
import NearAlcoholPage from "./pages/nearAlcohol/NearAlcoholPage";
import MyPage from "./pages/user/mypage/MyPage";
import LoginPage from "./pages/user/register/LoginPage";
import RegisterPage from "./pages/user/register/RegisterPage";
import FavoritePage from "./pages/user/mypage/FavoritePage";
import MyReviewPage from "./pages/user/mypage/MyReviewPage";
import BarAddReviewPage from "./pages/review/BarAddReviewPage";
import BarEditReviewPage from "./pages/review/BarEditReviewPage";
import BarInfoPage from "./pages/bar/BarInfoPage";
import BarReviewPage from "./pages/review/BarReviewPage";
import EditMyInfoPage from "./pages/user/mypage/EditMyInfoPage";
import PwCheckPage from "./pages/user/mypage/PwCheckPage";
import PwChangePage from "./pages/user/mypage/PwChangePage";
import Page404 from "./components/common/Page404";

const router = createBrowserRouter([
  {
    // 메인
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
    ],
  },
  {
    // 오늘의 술 찾기
    path: "/searchAlcohol",
    element: <App />,
    children: [
      {
        path: "",
        element: <SearchAlcoholPage />,
      },
    ],
  },
  {
    // 내 주변의 술
    path: "/near",
    element: <App />,
    children: [
      {
        path: "",
        element: <NearAlcoholPage />,
      },
    ],
  },
  {
    // 마이페이지
    path: "/mypage",
    element: <App />,
    children: [
      {
        path: "",
        element: <MyPage />,
      },
      {
        // 내가 찜한 페이지
        path: "favorite",
        element: <FavoritePage />,
      },
      {
        // 내가 작성한 리뷰
        path: "myReview",
        element: <MyReviewPage />,
      },
      {
        // 내 정보 수정
        path: "editMyInfo",
        element: <EditMyInfoPage />,
      },
      {
        // 비밀번호 확인
        path: "pwCheck",
        element: <PwCheckPage />,
      },
      {
        // 비밀번호 수정
        path: "pwChange",
        element: <PwChangePage />,
      },
    ],
  },
  {
    // 로그인
    path: "/login",
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
  {
    // 회원가입
    path: "/register",
    element: <App />,
    children: [
      {
        path: "",
        element: <RegisterPage />,
      },
    ],
  },
  {
    // 가게 상세 정보
    path: "/ohsul/bar/:barId",
    element: <App />,
    children: [
      {
        path: "",
        element: <BarInfoPage />,
      },
    ],
  },
  {
    // 가게 리뷰
    path: "/ohsul/:barId",
    element: <App />,
    children: [
      {
        path: "review",
        element: <BarReviewPage />,
      },
      {
        // 가게 리뷰 작성
        path: "addReview",
        element: <BarAddReviewPage />,
      },
      {
        // 가게 리뷰 수정 페이지
        path: "editReview/:reviewId",
        element: <BarEditReviewPage />,
      },
    ],
  },
  {
    //404
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);

export default router;
