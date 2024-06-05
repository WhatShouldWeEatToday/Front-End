import "../css/MyMenu.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";

function MyMenu({ onClose }) {
  const navigate = useNavigate();
  const menuRef = useRef();

  const [showSignOut, setShowSignOut] = useState(false);

  const goMyBookmarkPage = () => {
    navigate(`/restaurant/bookmark`);
  };

  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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

  return (
    <div className="MyMenu" ref={menuRef}>
      <div className="mymenu-container">
        <div className="myinfo-edit">회원 정보 수정</div>
        <div className="mybookmark" onClick={() => goMyBookmarkPage()}>
          내 즐겨찾기
        </div>
        <div
          className="signout"
          onClick={(e) => {
            e.stopPropagation();
            toggleSignOut();
          }}
        >
          회원 탈퇴
        </div>
        {showSignOut && <SignOut onClose={toggleSignOut} />}
      </div>
    </div>
  );
}

export default MyMenu;
