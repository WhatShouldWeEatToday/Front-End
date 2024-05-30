import { getMemberInfo } from "../utils/MemberInfo";
import React, { useEffect, useState } from "react";
import "../css/TopHeader.css";
import { NavLink } from "react-router-dom";
import Notification from "./Notification";

function TopHeader() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [showNotification, setShowNotification] = useState(false);
  const [nickname, setNickname] = useState(null); // 현재 로그인된 유저 이름
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

  // 로그인된 사용자 정보 가져오기
  const fetchMemberInfo = async () => {
    try {
      const res = await getMemberInfo();
      setNickname(res.data.nickname);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패 : ", error);
    }
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  if (accessToken && refreshToken) {
    return (
      <div className="TopHeader">
        <div className="TopHeader_Box">{nickname} 님</div>
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
