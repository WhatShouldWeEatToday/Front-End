import axios from "../utils/apis";
import { getMemberInfo } from "../utils/MemberInfo";
import React, { useRef, useEffect, useState } from "react";
import "../css/Notification.css";

// 임시데이터
// const Notifications = [
// {
//   id: 1,
//   type: "좋아요가 달렸습니다.",
//   content: "한솥도시락 리뷰에 이소림님이 좋아요를 눌렀습니다.",
// },
// {
//   id: 2,
//   type: "친구추가 되었습니다.",
//   content: "이지현님과 친구가 되었습니다.",
// },
// {
//   id: 3,
//   type: "채팅방에 초대되었습니다.",
//   content: "이지현님이 채팅방에 당신을 초대하였습니다.",
// },
// ];

function Notification({ onClose }) {
  const notificationRef = useRef();
  const [loginId, setLoginId] = useState("");
  const [Notifications, setNotifications] = useState([]);

  const getNotice = async (userId) => {
    if (!userId) return;
    axios
      .get(`http://localhost:8080/notices/${userId}`)
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 로그인된 사용자 정보 가져오기
  const fetchMemberInfo = async () => {
    try {
      const res = await getMemberInfo();
      // console.log(res.data);
      setLoginId(res.data.loginId);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패 : ", error);
    }
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        onClose(); // 외부 클릭 시 onClose 함수 호출
      }
    }

    getNotice(loginId);

    // 문서 전체에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, [loginId, onClose]);

  const NotificationList = Notifications.map((notification) => {
    return (
      <div className="notification-list" key={notification.id}>
        <div className="notification-type">{notification.noticeType}</div>
        <div className="notification-content">{notification.content}</div>
      </div>
    );
  });

  return (
    <div className="Notification" ref={notificationRef}>
      <div className="notification-container">
        <span className="notification-title">알림</span>
        <div className="notification-list-box">{NotificationList}</div>
      </div>
    </div>
  );
}

export default Notification;
