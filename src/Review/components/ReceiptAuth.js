import "../css/ReceiptAuth.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../etc/utils/apis";

function ReceiptAuth({ restaurantId }) {
  const navigate = useNavigate();

  const [receipt, setReceipt] = useState(null);
  const [fileName, setFileName] = useState("사진.jpg");

  // 파일(영수증) 변경시 상태 업데이트
  const handleReceiptChange = (e) => {
    setReceipt(e.target.files[0]); // 파일 선택시 파일 상태 업데이트
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // 파일 제출
  const submitReceipt = () => {
    if (receipt) {
      const formData = new FormData();
      formData.append("file", receipt); // 'file' 키에 receipt 추가

      axios
        .post("http://localhost:8080/api/review/receipt", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 파일 전송을 위한 헤더(필수)
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("영수증 제출 성공");
          navigate(`/restaurant/${restaurantId}/review/receiptAuth/CERTIFY`);
        })
        .catch((error) => {
          console.error(error);
          alert("영수증 제출 실패");
        });
    } else {
      alert("파일을 선택해주세요.");
    }
  };

  const skipAuthentication = () => {
    navigate(`/restaurant/${restaurantId}/review/receiptAuth/NOT_CERTIFY`);
  };

  return (
    <div className="ReceiptAuth">
      <div className="receipt-auth-box">
        <div className="receipt-title">영수증 인증</div>
        <div className="receipt-text">
          리뷰를 작성하기 전 영수증 인증을 해주세요!
        </div>
        <div className="receipt-upload-box">
          <input className="upload-name" value={fileName} disabled />
          <label htmlFor="file-upload" className="file-upload-text">
            파일 업로드
          </label>
          <input
            id="file-upload"
            className="receipt-input"
            type="file"
            onChange={handleReceiptChange}
          />
        </div>
        <div className="receipt-caution-text">
          사진 상태에 따라 정상적으로 인식이 되지 않을 수도 있으니 주의해주세요
        </div>
      </div>
      <div className="btn-wrapper">
        <button className="submit-btn" onClick={submitReceipt}>
          인증하기
        </button>
        <button className="skip-btn" onClick={skipAuthentication}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

export default ReceiptAuth;
