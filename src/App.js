import "./App.css";
import { Router, Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./Main/MainPage";
import LoginPage from "../src/User/Login/LoginPage";
import RegisterPage from "../src/User/Register/RegisterPage";
import NotFoundPage from "./etc/components/NotFoundPage";
import SearchPage from "../src/Search/SearchPage";
import ReviewPage from "../src/Review/ReviewPage";
import MyPage from "../src/User/Mypage/MyPage";
import BookMarkPage from "./User/BookMark/BookMarkPage";
import RankingPage from "./Ranking/RankingPage";
import RestaurantDetailsPage from "./Review/RestaurantDetailsPage";
import ReviewRegisterPage from "./Review/ReviewRegisterPage";
import ReviewEditPage from "./Review/ReviewEditPage";
import ReceiptAuthPage from "./Review/ReceiptAuthPage";

function App() {
  const links = [
    {
      path: "",
      element: <MainPage />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/signup",
      element: <RegisterPage />,
    },
    {
      path: "/signin",
      element: <LoginPage />,
    },
    {
      path: "/restaurant/search",
      element: <SearchPage />,
    },
    {
      path: "/restaurant/:restaurantId/review",
      element: <RestaurantDetailsPage />,
    },
    {
      path: "/restaurant/:restaurantId/review/receiptAuth",
      element: <ReceiptAuthPage />,
    },
    {
      path: "/restaurant/:restaurantId/review/receiptAuth/:authStatus",
      element: <ReviewRegisterPage />,
    },
    {
      path: "/restaurant/:restaurantId/review/edit/:reviewId",
      element: <ReviewEditPage />,
    },
    {
      path: "/restaurant/review",
      element: <ReviewPage />,
    },
    {
      path: "/ranking",
      element: <RankingPage />,
    },
    {
      path: "/restaurant/bookmark",
      element: <BookMarkPage />,
    },
    {
      path: "/mypage",
      element: <MyPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  const linkPage = () => {
    return links.map((route) => {
      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );
    });
  };

  return (
    <BrowserRouter>
      <Routes>{linkPage()}</Routes>
    </BrowserRouter>
  );
}

export default App;
