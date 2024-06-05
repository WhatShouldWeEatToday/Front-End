import "../css/SignOut.css";
import { useState, useEffect, useRef } from "react";
import axios from "../utils/apis";
import { useNavigate } from "react-router-dom";

function SignOut({ onClose }) {
  const navigate = useNavigate();
  const SignOutRef = useRef();

  const [pw, setPw] = useState("");

  const signOutUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/user/delete`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // localStorage가 아닌 sessionStorage에서 accessToken을 가져옵니다.
            "Content-Type": "application/json",
          },
          data: {
            checkPassword: pw, // 사용자 로그인 PW
          },
        }
      );
      console.log("회원 탈퇴 완료");
      window.location.reload();
    } catch (error) {
      console.error(error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (SignOutRef.current && !SignOutRef.current.contains(event.target)) {
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
    <div className="SignOut" ref={SignOutRef}>
      {/* <div className="signOut-input-box">
        <label className="signOut-label-id" htmlFor="id">
          아이디
        </label>
        <input
          className="signOut-input-id"
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div> */}
      <div className="signOut-input-box">
        <label className="signOut-label-pw" htmlFor="pw">
          비밀번호
        </label>
        <input
          className="signOut-input-pw"
          type="password"
          id="pw"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
      <button
        className="signOut-btn"
        type="submit"
        onClick={() => signOutUser()}
      >
        회원 탈퇴
      </button>
    </div>
  );
}

export default SignOut;
