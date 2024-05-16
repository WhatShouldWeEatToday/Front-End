import React, { useState } from "react";
import "../css/TopHeader.css";
import { NavLink } from "react-router-dom";
import Notification from "./Notification";

function TopHeader() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [showNotification, setShowNotification] = useState(false);
  // console.log("토큰1: ", accessToken);
  // console.log("토큰2: ", refreshToken);

  // const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload(); // 페이지 새로고침
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  if (accessToken && refreshToken) {
    return (
      <div className="TopHeader">
        <div className="TopHeader_Box">님</div>
        <div className="TopHeader_Box" onClick={handleLogout}>
          로그아웃
        </div>
        <div className="TopHeader_Box">
          <img
            className="notification-icon"
            src={process.env.PUBLIC_URL + "/img/notification.png"}
            width="50px"
            height="50px"
            alt="alert_on"
            onClick={(e) => {
              e.stopPropagation();
              toggleNotification();
            }}
          />
        </div>
        {showNotification && <Notification onClose={toggleNotification} />}
        <NavLink to="/mypage">
          <img
            src={process.env.PUBLIC_URL + "/img/account.png"}
            width="50px"
            height="50px"
            alt="profile"
          />
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="TopHeader">
        <div className="TopHeader_Box">
          <NavLink to="/signin">로그인</NavLink>
        </div>
        <div className="TopHeader_Box">
          <img
            src={process.env.PUBLIC_URL + "/img/notification.png"}
            width="50px"
            height="50px"
            alt="alert_on"
          />
        </div>
        <NavLink to="/mypage">
          <img
            src={process.env.PUBLIC_URL + "/img/account.png"}
            width="50px"
            height="50px"
            alt="profile"
          />
        </NavLink>
      </div>
    );
  }
}

export default TopHeader;
