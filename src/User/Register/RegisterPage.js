import { NavLink } from "react-router-dom";
import "./css/RegisterPage.css";

function RegisterPage() {
  return (
    <div className="RegisterPage">
       <div className="Container">
        <NavLink to="/signup">
          <img
            className="LOGO"
            alt="Logo"
            src={process.env.PUBLIC_URL + "/img/LOGO.png"}
          />
        </NavLink>
        <form className="registerForm" method="post">
          <div className="BlackLine1" />
          <label className="labelId">아이디</label>
          <input
            className="inputId"
            type="text"
            placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
            required
          />
          <label className="labelPw">비밀번호</label>
          <input
            className="inputPw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <label className="labelPwCheck">비밀번호 확인</label>
          <input
            className="inputPwCheck"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            required
          />
          <label className="labelName">이름</label>
          <input
            className="inputName"
            type="text"
            placeholder="이름을 입력해주세요"
            required
          />
          <div className="registerBtnBox">
            <input
              type="submit"
              value="가입하기"
              className="registerBtn"
            ></input>
          </div>
        </form>
        <div className="BlackLine2" />
      </div>
    </div>
  );
}

export default RegisterPage;
