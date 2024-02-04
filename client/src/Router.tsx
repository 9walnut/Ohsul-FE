// Router.tsx
import { createBrowserRouter, useNavigate } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import App from "./App";
import SearchAlcoholPage from "./pages/searchAlcohol/SearchAlcoholPage";
import NearAlcoholPage from "./pages/nearAlcohol/NearAlcoholPage";
import MyPage from "./pages/user/mypage/MyPage";
import LoginPage from "./pages/user/register/LoginPage";
import RegisterPage from "./pages/user/register/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "main",
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
]);

export default router;
