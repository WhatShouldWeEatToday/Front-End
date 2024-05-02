import { NavLink, useNavigate } from "react-router-dom";
import "./css/LoginPage.css";
import { useState } from "react";
import axios from "../../etc/utils/apis";

function LoginPage() {
  const saveTokensToLocalStorage = (accessToken, refreshToken) => {
    // 받은 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem("accessToken", accessToken);
    // 받은 리프레시 토큰을 로컬 스토리지에 저장
    localStorage.setItem("refreshToken", refreshToken);
  };

  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const goRegisterPage = () => {
    navigate("/signup");
  };

  const onClickLogin = () => {
    console.log("ID = " + inputId);
    console.log("PW = " + inputPw);
    axios
      .post("http://localhost:8080/api/signin", {
        loginId: inputId,
        loginPw: inputPw,
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data; // 응답 데이터에서 토큰 추출
        console.log(res.data);
        saveTokensToLocalStorage(accessToken, refreshToken); // 토큰을 로컬 스토리지에 저장
        console.log(accessToken);
        console.log(refreshToken);
        alert("로그인에 성공하였습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패하였습니다.");
        navigate("/signin");
      });
  };

  return (
    <div className="LoginPage">
      <div className="Container">
        <NavLink to="/signin">
          <img
            className="LOGO"
            alt="Logo"
            src={process.env.PUBLIC_URL + "/img/LOGO.png"}
          />
        </NavLink>
        <label className="labelId">ID</label>
        <input className="inputId" value={inputId} onChange={handleInputId} />
        <label className="labelPw">PW</label>
        <input
          className="inputPw"
          value={inputPw}
          type="password"
          onChange={handleInputPw}
        />
        <button className="LoginBtn" onClick={onClickLogin}>
          로그인
        </button>
      </div>
      <button className="goRegisterPageBtn" onClick={goRegisterPage}>
        회원가입
      </button>
    </div>
  );
}

export default LoginPage;
