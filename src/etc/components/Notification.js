import React, { useRef, useEffect } from "react";
import "../css/Notification.css";

// 임시데이터
const Notifications = [
  {
    id: 1,
    type: "좋아요가 달렸습니다.",
    content: "한솥도시락 리뷰에 이소림님이 좋아요를 눌렀습니다.",
  },
  {
    id: 2,
    type: "친구추가 되었습니다.",
    content: "이지현님과 친구가 되었습니다.",
  },
  {
    id: 3,
    type: "채팅방에 초대되었습니다.",
    content: "이지현님이 채팅방에 당신을 초대하였습니다.",
  },
];

function Notification({ onClose }) {
  const notificationRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        onClose(); // 외부 클릭 시 onClose 함수 호출
      }
    }

    // 문서 전체에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const NotificationList = Notifications.map((data) => {
    return (
      <div className="notification-list" key={data.id}>
        <div className="notification-type">{data.type}</div>
        <div className="notification-content">{data.content}</div>
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
