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

const router = createBrowserRouter([
  {
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
    path: "/mypage",
    element: <App />,
    children: [
      {
        path: "",
        element: <MyPage />,
      },
      {
        path: "favorite",
        element: <FavoritePage />,
      },
      {
        path: "myreview",
        element: <MyReviewPage />,
      },
    ],
  },
  {
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
    path: "/barReviews",
    element: <App />,
    children: [
      {
        path: "addReview",
        element: <BarAddReviewPage />,
      },
    ],
  },
]);

export default router;
