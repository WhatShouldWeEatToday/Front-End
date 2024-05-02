import { NavLink, useNavigate } from "react-router-dom";
import "./css/RegisterPage.css";
import { useState } from "react";
import axios from "../../etc/utils/apis";

function RegisterPage() {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [gender, setInputGender] = useState(0);
  const [inputAge, setInputAge] = useState(1);
  const [validId, setValidId] = useState(false);
  const [validName, setValidName] = useState(false);

  const handleInputId = (e) => {
    setInputId(e.target.value);
    setValidId(false);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const handleInputName = (e) => {
    setInputName(e.target.value);
    setValidName(false);
  };
  const handleInputAge = (e) => {
    setInputAge(e.target.value);
  };
  const handleInputGender = (e) => {
    setInputGender(e.target.value);
  };

  // 아이디 중복 확인
  const onClickConfirmId = async () => {
    axios
      .get(`http://localhost:8080/confirmLoginId/${inputId}`)
      .then((res) => {
        setValidId(true);
        console.log(res.data);
        alert(res.data);
      })
      .catch((error) => {
        if (error.response) {
          if (!inputId) {
            console.log("아이디를 입력해주세요.");
            alert("아이디를 입력해주세요.");
          } else {
            console.log(error.response.data.message);
            alert(error.response.data.message);
          }
        } else if (error.request) {
          // 요청이 이루어졌으나 응답을 받지 못한 경우
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
          console.log("Error", error.message);
        }
      });
  };

  // 닉네임 중복 확인
  const onClickConfirmName = async () => {
    axios
      .get(`http://localhost:8080/confirmNickname/${inputName}`)
      .then((res) => {
        setValidName(true);
        console.log(res.data);
        alert(res.data);
      })
      .catch((error) => {
        if (error.response) {
          if (!inputName) {
            console.log("닉네임을 입력해주세요.");
            alert("닉네임을 입력해주세요.");
          } else {
            console.log(error.response.data.message);
            alert(error.response.data.message);
          }
        } else if (error.request) {
          // 요청이 이루어졌으나 응답을 받지 못한 경우
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
          console.log("Error", error.message);
        }
      });
  };

  const onClickSignUp = async () => {
    console.log("click register");
    console.log("ID = ", inputId);
    console.log("PW = ", inputPw);
    console.log("Nickname = ", inputPw);
    console.log("Gender = ", gender);
    console.log("Age = ", inputAge);

    axios
      .post("http://localhost:8080/api/signup", {
        loginId: inputId,
        loginPw: inputPw,
        nickname: inputName,
        age: inputAge,
        gender: gender,
      })
      .then((res) => {
        if (validId && validName) {
          console.log(res.data);
          alert("회원가입에 성공하였습니다.");
          navigate("/signin");
        } else {
          alert("아이디를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("회원가입에 실패하였습니다.");
        navigate("/signup");
      });
  };

  return (
    <div className="RegisterPage">
      <div className="Container">
        {/* 로고 클릭 시 로그인 화면으로 이동 */}
        <NavLink to="/signin">
          <img
            className="LOGO"
            alt="Logo"
            src={process.env.PUBLIC_URL + "/img/LOGO.png"}
          />
        </NavLink>
        {/* 구분선 */}
        <div className="DividingLine1" />
        <div className="registerForm" method="post">
          <label className="labelId">아이디</label>
          <input
            className="inputId"
            type="text"
            placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
            name="loginId"
            value={inputId}
            onChange={handleInputId}
            required
          />
          <button className="checkIdBtn" onClick={onClickConfirmId}>
            아이디 중복확인
          </button>
          <label className="labelPw">비밀번호</label>
          <input
            className="inputPw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="inputPw"
            value={inputPw}
            onChange={handleInputPw}
            required
          />
          <label className="labelPwCheck">비밀번호 확인</label>
          <input
            className="inputPwCheck"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            required
          />
          <label className="labelName">닉네임</label>
          <input
            className="inputName"
            type="text"
            placeholder="닉네임을 입력해주세요"
            name="nickname"
            value={inputName}
            onChange={handleInputName}
            required
          />
          <button className="checkNameBtn" onClick={onClickConfirmName}>
            닉네임 중복확인
          </button>
          <label className="labelGender">성별</label>{" "}
          {/* 값이 0이면 남자 / 1이면 여자*/}
          <label>
            <input
              className="inputGender"
              name="gender"
              type="radio"
              value="0"
              onChange={handleInputGender}
              checked
            />
            남자
          </label>
          <label>
            <input
              className="inputGender"
              name="gender"
              type="radio"
              value="1"
              onChange={handleInputGender}
            />
            여자
          </label>
          <label className="labelAge">나이</label>
          <input
            type="number"
            name="age"
            min="1"
            value={inputAge}
            onChange={handleInputAge}
          />
          <div className="registerBtnBox">
            <button className="registerBtn" onClick={onClickSignUp}>
              가입하기
            </button>
          </div>
          {/* 구분선 */}
          <div className="DividingLine2" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
