import './App.css';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from './Main/MainPage';
import LoginPage from '../src/User/Login/LoginPage';
import RegisterPage from '../src/User/Register/RegisterPage';
import NotFoundPage from './etc/components/NotFoundPage';
import SearchPage from '../src/Map/MapPage';
import ReviewPage from '../src/Review/ReviewPage';
import LankingPage from '../src/Lanking/LankingPage';
import MyPage from '../src/User/Mypage/MyPage';
import BookMarkPage from './User/BookMark/BookMarkPage';


function App() {

  const links = [
    {
      path:'',
      element: <MainPage/>
    },
    {
      path:'/',
      element: <MainPage/>
    },
    {
      path:'/signup',
      element: <RegisterPage/>
    },
    {
      path:'/signin',
      element: <LoginPage/>
    },
    {
      path:'/restaurant/search',
      element: <SearchPage/>
    },
    {
      path:'/review',
      element: <ReviewPage/>
    },
    {
      path:'/lanking',
      element: <LankingPage/>
    },
    {
      path:'/restaurant/bookmark',
      element: <BookMarkPage/>
    },
    {
      path:'/mypage',
      element: <MyPage/>
    },
    {
      path:'*',
      element: <NotFoundPage/>
    }
  ]

  const linkPage = () =>{
    return(
      links.map(route =>{
        return(
          <Route
            key={route.path}
            path={route.path}
            element={route.element}/>
        )
      })
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {linkPage()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
