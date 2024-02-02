import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import App from "./App";
import SearchAlcoholPage from "./pages/searchAlcohol/SearchAlcoholPage";
import NearAlcoholPage from "./pages/nearAlcohol/NearAlcoholPage";

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
]);

export default router;
