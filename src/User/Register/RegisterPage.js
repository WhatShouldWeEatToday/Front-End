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
        <div className="BlackLine1" />
        <form className="registerForm" method="post">
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
          <label className="labelGender">성별</label>
          <label>
            <input
              className="inputGender"
              name="gender"
              type="radio"
              value="male"
              checked
            />
            남자
          </label>
          <label>
            <input
              className="inputGender"
              name="gender"
              type="radio"
              value="female"
            />
            여자
          </label>
          <label className="labelAge">나이</label>
          <input type="number" min="0" />
          <div className="registerBtnBox">
            <input type="submit" value="가입하기" className="registerBtn" />
          </div>
          <div className="BlackLine2" />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
