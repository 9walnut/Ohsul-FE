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
    path: "/nearAlcohol",
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
    path: "/barInfo",
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
    path: "/barReviews",
    element: <App />,
    children: [
      {
        path: "",
        element: <BarReviewPage />,
      },
      {
        // 가게 리뷰 작성
        path: "addReview",
        element: <BarAddReviewPage />,
      },
      {
        // 가게 리뷰 수정
        path: "editReview",
        element: <BarEditReviewPage />,
      },
    ],
  },
]);

export default router;
